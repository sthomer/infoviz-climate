import csv
import json
import sys

countriesName = {	"United States" : "United States of America",
					"Congo, Dem. Rep." : "Democratic Republic of the Congo",
					"Congo, Rep." : "Republic of the Congo",
					"Tanzania" : "United Republic of Tanzania",
					"Guinea-Bissau" : "Guinea Bissau",
					"Serbia" : "Republic of Serbia"}

def main():
	globalData = {}
	sizeVector = 2566
	
	if (len(sys.argv) < 2):
		print("Error: please enter input file and output file as argument")
	else:
		inputFile = sys.argv[1]
		#outputFile = sys.argv[2]

		print("input file : ", inputFile)
		#print("output file : ", outputFile)

		#with open("GlobalTemp_TEST.csv") as csv_file:
		with open(inputFile) as csv_file:
			reader = csv.reader(csv_file, delimiter=',')
			line_count = 0

			for row in reader:
				if line_count == 0:
					#globalData["colNames"] = row
					globalData["dates"] = row[1:]
					line_count += 1

				else:
					if row[0] in countriesName:
						name = countriesName[row[0]]
					else:
						name = row[0]
					dataTemp = row[1:]


					globalData[name] = dataTemp

		csv_file.close()
		

		"""# Global Temp transformation
		for elem in globalData:
			elemSize = len(globalData[elem])
			if elemSize < sizeVector:
				globalData[elem] = (["0"] * (sizeVector - elemSize - 1)) + globalData[elem]
		
		dates = globalData["dates"]
		tmpDates = []
		for i in range(0, len(dates), 12):
			tmpDates += [dates[i][:4]]
		globalData["dates"] = tmpDates

		for elem in globalData:
			if elem != "dates":
				temps = globalData[elem]
				meanTemp = []
				for i in range(0, len(temps), 12):
					tmp = []
					for j in range(12):
						if i+j < len(temps):
							if temps[i+j] == "":
								tmp += [0]
							else:
								tmp += [float(temps[i+j])]
					mean = sum(tmp) / 12
					meanTemp += [mean]
				globalData[elem] = meanTemp"""

		datesArray = globalData["dates"] 
		del globalData["dates"]

		newData = {}
		newData["dates"] = datesArray
		newData["globalMean"] = []
		sizeData = len(globalData)
		for year in range(len(datesArray)):
			sizeData = len(globalData)
			tmpMean = 0.0
			for elem in globalData:
				dataArray = globalData[elem]
				if dataArray[year] == 0:
					sizeData -= 1
				elif dataArray[year] == "":
					sizeData -= 1
				elif dataArray[year] != "":
					tmpMean += float(dataArray[year])
				
			tmpMean /= sizeData	
			print(tmpMean, " : ", sizeData)
			newData["globalMean"] += [tmpMean]

		#print(newData)


		outputFile = inputFile[:len(inputFile)-4] + "GLOBALMEAN.json"
		with open(outputFile, "w") as jsonFile:
			json.dump(newData, jsonFile)	




if __name__ == '__main__':
  main()

