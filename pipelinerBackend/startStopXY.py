# pip install pyserial
import serial
import keyboard
import time

ser = serial.Serial("COM4", 9600)
while True:
    try:
        if keyboard.is_pressed("q"):
            print("Sent")
            ser.write(bytearray("0", "ascii"))
            time.sleep(3)
        else:
            bs = ser.readline()
            print(bs)
    except Exception as e:
        print(e)
