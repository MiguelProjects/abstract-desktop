All steps have been done and all functions have been implemented. 

To run our code, please place "server_setup.sh" in the same directory as "server.py" and "client.py" before running client.py or server.py. The code should still work without it, but it will just be using the last hostname we tested with. 

The following files should be in the same directory:
* client_data (must be created)
* server_data (must be created)
* client.py
* server.py
* server_setup.sh


server.py functions:

check_is_empty
* Helper function - if server directory is empty, notify the client

ls_to_print_format
* Helper function - prepare the directiory list in client-desired (human readable) format.

do_lst
* Server side of LIST - sends server directory contents to client

do_push
* Server side of PUSH - creates and writes file based on sent data from client

do_delete
* Server side of DELETE - deletes file from server directory

do_overwrite
* Server side of OVERWRITE - overwrites file contents with hard coded string

do_ext
* Server side of EXIT - Disconnects the client if they choose to 'exit'

parse_command
*Parse command from client

recieve_from_client
* Threaded function - Takes care of client connection (10 max)


client.py functions:

lst
* Client side of LIST - receieve list of server contents

push
* Client side of PUSH - provide file (file contents) to send 

delete
* Client side of DELETE - only need to get response message from server DELETE 

overwrite
* Client side of OVERWRITE - only need to get response message from server OVERWRITE

ext
* Client side of EXIT - change exit variable to true, actual exit handled elsewhere (client_doing)

parse_command
* Sends message to server - then acts accordingly

establish_connection
* Try to connect to server

client_doing
* A loop used to take user input and manage connection (if connection error)
* Where we actually handle exit