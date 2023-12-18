import socket
import os

def lst():
    # Receive first response from server - should be size of list if dir non-empty
    meta = sock.recv(1024)
    if meta == b"Server directory is empty!":
        print(meta.decode('utf-8'))
        return
    size = int.from_bytes(meta, 'little')

    # Use size to calculate how many times we receive response from server
    counter = (size // 1024)
    if size % 1024 > 0:
        counter += 1

    ls = ""

    # Prepare the list printout
    for i in range(counter):
        line = sock.recv(1024)
        try:
            ls += line.decode(encoding='utf-8')
        except:
            pass
    
    # Print server directory list
    print(ls.rstrip())


def push(file_path):
    # Check if file exists, and send it over if it does
    if os.path.isfile(file_path):
        file_bytes = os.stat(file_path).st_size
        sock.sendall(file_bytes.to_bytes(1024, 'little'))
        file = open(file_path, 'rb')
        sock.sendfile(file)
        file.close()
        resp = sock.recv(1024).decode('utf-8')
        if resp.split(" ")[0] == "Received":
            print(resp)
    else: 
        sock.sendall(b'file not found! sorry for wasting server resources :(')


def delete():
    # Receive and print server response appropriately
    return_message = sock.recv(1024)
    print(return_message.decode('UTF-8'))


def overwrite():
    # Receive and print server response appropriately
    return_message = sock.recv(1024)
    print(return_message.decode('UTF-8'))


def ext(): 
    # Set get_out to True so we know that we wish to exit
    global get_out 
    get_out = True


def parse_command(user_input):
    # Take the user input and split it up to extract command
    input_split = user_input.split(" ")
    command = input_split[0].upper()  
    
    message = user_input.encode('utf-8')
    sock.sendall(message)
    
    # Act appropriately according to the user command
    if (command == "LIST"):
        lst()
    elif (command == "PUSH"):
        if len(input_split) < 2:
            print("PUSH needs a filepath!")
            return
        push(input_split[1])
    elif (command == "DELETE"):
        delete()
    elif (command == "OVERWRITE"):
        overwrite()
    elif (command == "EXIT"):
        ext()
    else:
        print("Invalid command...")
        return  


def establish_connection():
    # Try to connect to server
    global get_out
    get_out = True
    try:
        sock.connect(server_address)
    except:
        print("Connection failed... goodbye")
        return
    
    # Wait for server to acknowledge our connection
    response = sock.recv(1024)
    if response != b"gucci":
        print("Connection not accepted server-side... goodbye")
    else:
        get_out = False
        print("Welcome to the File Server!")


def client_doing():
    # Set up client loop
    try:
        establish_connection()
        while(not get_out):
            # Send data
            user_input = input(">")
            parse_command(user_input)
    except:
        pass
    finally:
        if get_out:
            sock.close()
            print("Disconnected from the server!")
        else:
            print("Something went wrong... please wait as we try to re-establish connection")
            client_doing()
    



# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
hostname = "dh2020pc03"
server_address = (hostname, 52168)

# Start client loop
get_out = False
client_doing()


