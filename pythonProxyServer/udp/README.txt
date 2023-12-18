All functions have been implemented. 
Only thing not done is making sure that sequence numbers are not unlimited. This is why max_seq is really large in client.py

Server:
PacketServer:
- execute: given header information from the packet, performs the function specified
- establish_seq: looks at packets in buffer and executes what it can in order (establishes a sequence)
- add_packet: adds a packet to the buffer

receive_from_client: base loop of server for receiving client files
/////////////////////
/////////////////////
/////////////////////

Client:
WindowNode:
- check_timeout: check's a packet's timer to see if it has timed out
- send: sends packet data if not ackd and its timed out

Window
- add_node: adds a node (packet) to buffer
- send_all: sends data within window
- acknowledge: updates node if it got ackd or timedout
- remove_ackd: removes an ack'd file from the buffer
- clear: clears the window

prepare_filename: prepares filename to be sent

prepare_content: prepares entire packet to be sent

update_window: updates window by removing ackd packets and adding to-be-sent packets (within window size)

send_stuff: using the window, it sends everything within it then also notifies when acks are received

client_doing: base loop of client, take input of file path to send to server