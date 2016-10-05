tail -f /var/log/squid/access.log | awk '{print$3 " - " $8 " - " $7 " - - "$4}'
