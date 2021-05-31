/\[/ { next }
/\]/ { next }

/line1/ {
   #"line1":"Massachusetts Hall"
   gsub("Massachusetts Hall", "FooBar", $0); print
   next
}
{ print }