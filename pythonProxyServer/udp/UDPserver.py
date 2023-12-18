import socket
import time
import random

data_frame = 80
server_state = False
server_dir_path = "server_data/"
filename = "server_data/"
received_bytes = 0
expecting = 0

class PacketServer:
    def __init__(self, data = '/\/\/\/'):
        global received_bytes
        if data=='/\/\/\/':
            self.seq = -1
            self.func = b''
            self.content = b''
        else:
            self.seq = int(data.split(b'/')[0].decode('utf-8'))
            self.func = data.split(b'/')[1]
            self.content = data[len(data.split(b'/')[0] + b'/' + self.func + b'/'):]

        if self.func == b'w':
            received_bytes += len(self.content)
            lf = open("server_logs.txt", 'a')
            lf.write("Receiver: received PKT" + str(self.seq) + "\n")
            lf.close()
        
        if self.seq >= 0:
            print("PKT" + str(self.seq) + " received. Expecting " + str(expecting))

        self.next = None
    
    def execute(self):
        global server_state
        global server_dir_path
        global filename

        if self.func == b'f' and not server_state:
            filename += self.content.decode('utf-8')
        if self.func == b'w':
            if not server_state:
                f = open(filename, 'wb')
                server_state = True
                lf = open("server_logs.txt", 'a')
                lf.write("Receiver: received filename\n")
                lf.close()
            else:
                f = open(filename,'ab')
            f.write(self.content)
            f.close()
        if self.func == b'e' and server_state:
            filename = server_dir_path
            server_state = False
            lf = open("server_logs.txt", 'a')
            lf.write("Receiver: file transfer completed\n")
            lf.write("Receiver: number of bytes received: " + str(received_bytes) + " bytes\n")
            lf.close()

        return self.establish_seq()

    def establish_seq(self):
        global expecting
        if self.next != None and self.next.seq == self.seq + 1:
            return self.next.execute()
        expecting = self.seq + 1
        return self 
    
    def add_packet(self, pack):
        if self.next != None and pack.seq > self.next.seq:
            self.next.add_packet(pack)
        else:
            pack.next = self.next
            self.next = pack


def receive_from_client():
    curr = PacketServer()
    while True:
        data, address = sock.recvfrom(data_frame)
        drop = random.randint(1,10)
        if(drop < 4):
            continue
        new = PacketServer(data)
        curr.add_packet(new)
        curr = curr.establish_seq()
        ack = "ack" + str(new.seq)
        sock.sendto(ack.encode('utf-8'), address)


# Server start
print("[STARTING] Server is starting...")

# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind the socket to the port
server_address = (socket.gethostname(), 52168)
sock.bind(server_address)

# Listen for incoming connections
print('[LISTENING] Server is listening...')

try:
    receive_from_client()
except BaseException as e:
    print(e)
finally:
    sock.close()