import socket
import time
import random

frame_size = 80
window_size = 5
last_acked = -1
add_to_window = 0
p = 0
max_seq = 10000000
pkt_lst = []
timeout = 0.5
effective_bytes = 0
bytes_sent = 0
sent_pkts = 0
total_rtt = 0
max_rtt = 0
min_rtt = float('inf')
num_acks = 0
num_tos = 0


class Packet:
    def __init__(self, data):
        global p
        self.num = p
        self.func = data.split(b'/')[1]
        self.ackd = False
        self.data = data
    
    def __repr__(self):
        return ""

    def __str__(self):
        return ""



class WindowNode:
    def __init__(self, pkt):
        self.pkt = pkt
        self.next = None
        self.time_sent = -1

    def __repr__(self):
        return ""

    def __str__(self):
        return ""

    def check_timeout(self):
        global num_tos
        res = (time.monotonic() - self.time_sent) > timeout
        if res and self.pkt.func == b'w':
            print("PKT" + str(self.pkt.num) + " Timed Out")
            num_tos += 1
        return res

    def send(self):
        global sent_pkts
        global bytes_sent
        if not self.pkt.ackd and (self.time_sent < 0 or self.check_timeout()):
            sock.sendto(self.pkt.data, server_address)
            if self.pkt.func == b'w':
                bytes_sent += len(self.pkt.data)
                sent_pkts += 1
            f = open("client_logs.txt", 'a')
            f.write("Sender: sent PKT" + str(self.pkt.num) + "\n")
            f.close()
            self.time_sent = time.monotonic()
            


class Window:
    def __init__(self):
        self.size = 0
        self.head = None
        self.tail = None

    def __repr__(self):
        s = ""
        curr = self.head
        while curr is not None:
            curr = curr.next
        return s

    def __str__(self):
        s = ""
        curr = self.head
        while curr is not None:
            curr = curr.next
        return s

    def add_node(self, pkt):
        new_node = WindowNode(pkt)
        if (self.head is None):
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def send_all(self):
        curr = self.head
        while curr is not None:
            curr.send()
            curr = curr.next

    def acknowledge(self, num, t):
        global effective_bytes
        global min_rtt
        global max_rtt
        global total_rtt
        global num_acks
        curr = self.head
        while curr is not None:
            if curr.pkt.num == num:
                curr.pkt.ackd = True
                num_acks += 1
                effective_bytes += len(curr.pkt.data)
                f = open("client_logs.txt", 'a')
                f.write("Sender: received ACK" + str(curr.pkt.num) + "\n")
                f.close()
                print("ACK" + str(curr.pkt.num) + " received")
                print("Start Time: " + str(curr.time_sent) + " sec")
                print("End Time: " + str(t) + " sec")
                rtt = t - curr.time_sent
                min_rtt, max_rtt = min(min_rtt, rtt), max(max_rtt, rtt)
                total_rtt += rtt
                print("RTT: " + str(rtt) +  " sec")
                return
            curr = curr.next

    def remove_ackd(self):
        global last_acked
        i = 0
        while self.head is not None and self.head.pkt.ackd:
            last_acked = self.head.pkt.num
            self.head = self.head.next
        if self.head is None:
            self.clear()
            return
        
        curr = self.head
        while curr.next is not None and curr.next.pkt.num < p - window_size:
            if curr.next.pkt.ackd:
                curr.next = curr.next.next
            else:
                curr = curr.next
        self.tail = curr


    def clear(self):
        self.size = 0
        self.head = None
        self.tail = None




def prepare_filename(filename):
    global p
    global pkt_lst
    i = 0;  
    filename_bytes = filename.encode('utf-8')
    while i < len(filename_bytes):
        header = (str(p) + '/f/').encode('utf-8')
        e = max(i + frame_size - (len(header)), len(filename_bytes))
        pk = Packet(header + filename_bytes[i:e])
        pkt_lst.append(pk)
        i = e
        p = (p+1)%max_seq


def prepare_content(f):
    global p
    global pkt_lst
    data = "lol"
    while data:
        header = (str(p) + '/w/').encode('utf-8')
        data = f.read(frame_size - len(header))
        content = header + data
        pk = Packet(content)
        pkt_lst.append(pk)
        p = (p+1)%max_seq
    pk = Packet((str(p) + '/e/').encode('utf-8'))
    pkt_lst.append(pk)
    p = (p+1)%max_seq


def update_window(win):
    global window_size
    global add_to_window
    global last_acked
    win.remove_ackd()
    if win.size >= window_size or not(win.head is None or win.head.pkt.num > last_acked + 1):
        return
    while win.size < window_size and add_to_window < len(pkt_lst):
        win.add_node(pkt_lst[add_to_window % len(pkt_lst)])
        add_to_window += 1
        

def send_stuff(win):
    global last_acked
    while last_acked < p - 1:
       update_window(win)
       win.send_all()
       ack = b'ack-1'
       try:
           ack = sock.recvfrom(frame_size)[0]
           t = time.monotonic()
       except BaseException as e:
           continue

       str_ack = ack.decode('utf-8')
       num_ack = int(str_ack.lower().strip('ack'))
       win.acknowledge(num_ack, t)


def reset_counters():
    global effective_bytes
    global sent_pkts
    global bytes_sent
    global min_rtt, max_rtt, total_rtt
    global num_tos
    effective_bytes = 0
    sent_pkts = 0
    bytes_sent = 0
    min_rtt = 0
    max_rtt = 0
    total_rtt = 0
    num_tos = 0


def client_doing():
    f = open("client_logs.txt", 'w')
    f.write("Sender: starting on host " + socket.gethostname() + "\n")
    f.close()
    while True:
        global pkt_lst
        global add_to_window
        win = Window()
        try:
            user_input = input(">")
            try:
                f = open(user_input, 'rb')
                filename = user_input.split('/')[-1]
                prepare_filename(filename)
                send_stuff(win)
                pkt_lst = []
                win.clear()
                reset_counters()
                add_to_window = 0
                lf = open("client_logs.txt", 'a')
                lf.write("Sender: sent file " + filename + "\n")
                print("Filename successfully sent")
                lf.close()
                
                prepare_content(f)
                f.close()
                send_stuff(win)
                lf = open("client_logs.txt", 'a')
                lf.write("Sender: file transfer completed" + "\n")
                lf.write("Sender: number of effective bytes sent: " + str(effective_bytes) + " bytes" + "\n")
                lf.write("Sender: number of packets sent: " + str(sent_pkts) + " packets" + "\n")
                lf.write("Sender: number of bytes: " + str(bytes_sent) + " bytes" + "\n")
                lf.close
                pkt_lst = []
                print("Maximum RTT:" + str(max_rtt * 1000) + " msec")
                print("Minimum RTT:" + str(min_rtt * 1000) + " msec")
                print("Avg RTT:" + str(total_rtt / num_acks) + " msec")
                print("Packet loss rate: " + str(num_tos / sent_pkts * 100) + "%")
                win.clear()
                reset_counters()
                add_to_window = 0
            except BaseException as e:
                print(e)
            finally:
                pass
        except BaseException as e:
            print("error in main client loop")
            print(e)
            exit()
        

        

# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

#set server stuff
server_address = ('dh2020pc29', 52168)

sock.settimeout(0.01)

# Start client loop
get_out = False
try:
    client_doing()
finally:
    sock.close();

    