#!/bin/bash


#tail -f /var/log/squid/access.log | awk '{ printf strftime("%H:%M %d/%m ") } $0' |cut -d' ' -f-2,4-12
tail -s 0.5 -f /var/log/squid/access.log | awk '{ printf strftime("%H:%M %d/%m ") } $0'
