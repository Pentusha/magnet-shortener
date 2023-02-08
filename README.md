## Description

I encountered a problem where the transmission client on my NAS 
can't download files from certain magnet links. 
The client displays an error in such cases: "file name too long". 
After some investigation, I realized that the issue is that the magnet link 
has an overly long header encoded in it. 

I created this project for myself to be able to make shortened headers for magnet links.

The project is built and published on my [home server](https://magnet.pentusha.com).