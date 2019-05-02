import csv

globalData = {}

with open("GlobalTemp_TEST.csv") as csv_file:
	reader = csv.reader(csv_file, delimiter=',')
	line_count = 0

	for row in reader:
		if line_count == 0:
			#globalData["colNames"] = row
			globalData["dates"] = []
		else:
			countryName = row[3]
			if countryName in globalData:
				globalData[countryName] += [row[1]]
			else:
				globalData[countryName] = [row[1]]
			globalData["dates"] += [row[0]]
		line_count += 1
csv_file.close()

for elem in globalData:
	print(elem,globalData[elem])


with open('testCSV.csv', mode='w') as csv_file:
	writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	writer.writerow(['country'] + globalData["dates"])
	del globalData["dates"]
	for elem in globalData:
		writer.writerow([elem] + globalData[elem])

csv_file.close()	

