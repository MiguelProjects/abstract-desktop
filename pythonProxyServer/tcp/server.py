import socket
import os
import threading

def check_is_empty(connection):
    # If server directory is empty, notify client
    if len(os.listdir("server_data")) == 0:
        connection.sendall(b"Server directory is empty!")
        return True
    return False


def ls_to_print_format(ls):
    # Prepare the directory list in client-desired format
    l = ""
    for i in ls:
        l += i + "\n"
    return l


def do_lst(connection):
    client_lock.acquire()
    # Notify client if directory is empty
    if check_is_empty(connection):
        client_lock.release()
        return
    # If directory is not empty, get list of files and send it to client
    ls = ls_to_print_format(os.listdir("server_data")).encode('utf-8')
    connection.sendall(len(ls).to_bytes(1024, 'little'))
    connection.sendall(ls)
    client_lock.release()


def do_push(filename, connection):
    client_lock.acquire()
    file_path = "server_data/" + filename.split("/")[-1]
    # Make sure that client has file ready, and receive file size
    meta = connection.recv(1024)
    if meta == b'file not found! sorry for wasting server resources :(':
        client_lock.release()
        return
    size = int.from_bytes(meta, 'little')
    file = open(file_path,'wb')

    # Use size to know how many times to receive from client
    counter = size // 1024
    if size % 1024 > 0:
        counter += 1
    
    resp = "Received the file {}".format(filename.split("/")[-1])
    try:
        # Write to file
        for i in range(counter):
            line = connection.recv(1024)
            file.write(line)
    except:
        resp = "Something went wrong :/"
    finally:
        file.close()

    connection.sendall(resp.encode('utf-8'))

    client_lock.release()


def do_delete(filename, connection):
    client_lock.acquire()
    
    # Notify the client if directory is empty
    if check_is_empty(connection):
        client_lock.release()
        return
    
    # Notify the client if file doesn't exist
    file_path = "server_data/" + filename
    if not os.path.isfile(file_path):
        connection.sendall(b"File not found!")
        client_lock.release()
        return
    
    # Remove the file and let client know the deed is done
    try:
        os.remove(file_path)
    except:
        connection.sendall(b"Can't remove file from server directory!")
        client_lock.release()
        return
    
    return_message = "The file {} deleted!".format(filename)
    connection.sendall(return_message.encode('utf-8'))
    client_lock.release()


def do_overwrite(finput, connection):
    client_lock.acquire()
    
    # Notify the client if file doesn't exist
    file_path = "server_data/" + finput
    if not os.path.isfile(file_path):
        connection.sendall(b"File not found!")
        client_lock.release()
        return
    
    # Overwrite file and let the client know the deed is done
    file = open(file_path,'wb')
    ovrwrt = b"File has been overwritten."

    file.write(ovrwrt)
    
    file.close()

    resp = "The file " + str(finput) + " overwritten!"

    connection.sendall(resp.encode('utf-8'))
    
    client_lock.release()


def do_ext(connection):
    # Client has disconnected
    connection.close()


def parse_command(data, connection):
    # Parse the command received from client appropriately
    input_split = data.decode(encoding='utf-8').split(" ")
    command = input_split[0].upper()
    if (command == "LIST"):
        do_lst(connection)
    elif (command == "PUSH"):
        do_push(input_split[1], connection)
    elif (command == "DELETE"):
        do_delete(input_split[1], connection)
    elif (command == "OVERWRITE"):
        do_overwrite(input_split[1], connection)
    elif (command == "EXIT"):
        do_ext(connection)
    return 


def receive_from_client():
    # Threaded function that takes care of connection with a client (out of 10)
    while safe:
        connection, client_address = sock.accept()
        try:
            connection.sendall(b'gucci')
            print('[NEW CONNECTION]', client_address)
            while True:
                data = connection.recv(1024)
                parse_command(data, connection)
        except:
            pass
        finally:
            # Capture case if thread fails
            connection.close()
    # Capture case if entire program fails
    try:
        connection.close()
    except:
        pass



# Server start
print("[STARTING] Server is starting...")

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = (socket.gethostname(), 52168)
try:
    os.system("./server_setup.sh 2> /dev/null")
except:
    pass

sock.bind(server_address)

# Listen for incoming connections
sock.listen(10)
print('[LISTENING] Server is listening...')

safe = True

# Prepare a thread for each possible connection
client_threads = []
client_lock = threading.Lock()

try:
    for i in range(10):
        x = threading.Thread(target=receive_from_client)
        client_threads.append(x)
        x.start()
except:
    safe = False





