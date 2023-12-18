The task was to make a UDP and TCP client-server application that allowed message passing. Reliable data transfer was a requirement (selective repeat for UDP).

Messages included normal text (actual messages) as well as files between the client and server. The client-data folder exists for this purpose, however we stored the files used for testing in the main directory simply due to the command being shorter when the source was from the main directory.

UDP - note:
- sequence numbers were not capped
- the window size for reliability was only placed in one, in reality it should be in both as the two do not necessarily trust each other