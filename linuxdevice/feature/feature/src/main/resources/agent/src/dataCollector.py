#!/usr/bin/env python
"""
/**
* Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
**/
"""

import multiprocessing
import os
import subprocess


def getBatteryLevel():

    fileexist = os.path.isfile('/sys/class/power_supply/BAT0/capacity')

    if fileexist is True:
        read_battery_level = open('/sys/class/power_supply/BAT0/capacity', 'r')
    else:
        read_battery_level = open('/sys/class/power_supply/BAT1/capacity', 'r')

    battery_level = read_battery_level.read()
    read_battery_level.close()

    if " " in battery_level[:3]:
        battery_level = battery_level[:2]
    else:
        battery_level = battery_level[:3]

    # print "----- BATTERY LEVEL -----"
    # print(battery_level + "%")
    # print

    return int(battery_level)


def getBatteryStatus():

    fileexist = os.path.isfile('/sys/class/power_supply/BAT0/status')

    if fileexist is True:
        read_battery_status = open('/sys/class/power_supply/BAT0/status', 'r')
    else:
        read_battery_status = open('/sys/class/power_supply/BAT1/status', 'r')

    battery_status = read_battery_status.read()
    read_battery_status.close()
    battery_status = battery_status.split(' ')[0]

    # charging = 1 / discharging = 0 / battery full = -1

    # if battery_status[:8] == "Charging"
    # unknown status assigns when the battery is full and the device is still plugged into charge
    if battery_status[:7] == "Unknown":
        battery_status = 1
    elif battery_status[:11] == "Discharging":
        battery_status = 0
    else:
        battery_status = 1

    # print "----- BATTERY STATUS -----"
    # print("Battery " + str(battery_status))
    # print

    return battery_status

def getCPUUsage():

    speed_list = []

    proc = subprocess.Popen(["cat", "/proc/cpuinfo"], stdout=subprocess.PIPE)
    out, err = proc.communicate()

    cores = multiprocessing.cpu_count()

    total = 0

    count = 1
    for line in out.split("\n"):

        if "cpu MHz" in line:
            speed = float(line.split(":")[1])

            total += speed

            # only is need to get all usages of each core
            # store data into a 2d array - add core number, processor speed and the total speed of a processor
            speed_list.append([count, speed])
            # print "Processor %d : %s MHz" % (count, speed)
            # break
            count += 1

    average = total / cores
    # TODO get the speed of one core in GHz "speedofone"
    speedofone = 2
    percentage = average * 100 / (speedofone * 1000)

    if percentage > 100:
        percentage = 99

    # sizeofone()
    percentage = round(percentage, 2)

    return percentage

def getDiskSpace():

    df = subprocess.Popen(["df", "/home/"], stdout=subprocess.PIPE)
    output = df.communicate()[0]

    details = output.split("\n")[1].split()

    df1 = subprocess.Popen(["df", "/"], stdout=subprocess.PIPE)
    output1 = df1.communicate()[0]

    details1 = output1.split("\n")[1].split()

    percentage = ((float(details[3]) + float(details1[3])) * 100) / (float(details[1]) + float(details1[1]))
    #return "%.2f" % round(percentage, 2)
    total = (float(details[1]) + float(details1[1])) / 1000000
    return "%.2f" % round(total, 2)

def getMemorySpace():

    proc = subprocess.Popen(["cat", "/proc/meminfo"], stdout=subprocess.PIPE)
    out, err = proc.communicate()

    total_memoey = 0
    free_memory = 0

    for line in out.split("\n"):

        if "MemTotal" in line:
            total = line.split(":")[1].replace(" ", "")
            total_memoey = float(total.split("k")[0])

        if "MemAvailable" in line:
            free = line.split(":")[1].replace(" ", "")
            free_memory = float(free.split("k")[0])

    percentage = (free_memory * 100) / total_memoey
    #return "%.2f" % round(percentage, 2)
    return "%.2f" % round((free_memory/1000), 2)

def getLoadAverage():

    average = os.getloadavg()
    load_average = str(average).split(", ")[0].replace("(", "")

    return float(load_average)

