import csv

globalData = {}

#with open("GlobalTemp_TEST.csv") as csv_file:
with open("GlobalLandTemperaturesByCountry.csv") as csv_file:
	reader = csv.reader(csv_file, delimiter=',')
	line_count = 0

	for row in reader:
		if line_count == 0:
			#globalData["colNames"] = row
			globalData["dates"] = []
			line_count += 1

		else:
			# Sorting with minimal date
			year = row[0].split("-")[0]
			if year >= "1800":
				countryName = row[3]
				if countryName in globalData:
					globalData[countryName] += [row[1]]
				else:
					globalData[countryName] = [row[1]]
				if row[0] not in globalData["dates"]:
					globalData["dates"] += [row[0]]


csv_file.close()

with open('GlobalTempByCountryFrom1800.csv', mode='w') as csv_file:
	writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	writer.writerow(['country'] + globalData["dates"])
	del globalData["dates"]
	for elem in globalData:
		writer.writerow([elem] + globalData[elem])

csv_file.close()	

