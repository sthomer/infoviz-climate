import csv
import json

globalData = {}

#with open("GlobalTemp_TEST.csv") as csv_file:
with open("GlobalTempByCountryFrom1800.csv") as csv_file:
	reader = csv.reader(csv_file, delimiter=',')
	line_count = 0

	for row in reader:
		if line_count == 0:
			#globalData["colNames"] = row
			globalData["dates"] = row
			line_count += 1

		else:
			name = row[0]
			dataTemp = row[1:]


			globalData[name] = dataTemp

csv_file.close()

with open("GlobalTempByCountryFrom1800JSON.txt", "w") as jsonFile:
	json.dump(globalData, jsonFile)	

