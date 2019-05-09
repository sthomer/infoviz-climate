import csv
import json
import sys

def main():
	globalData = {}
	
	if (len(sys.argv) < 3):
		print("Error: please enter input file and output file as argument")
	else:
		inputFile = sys.argv[1]
		outputFile = sys.argv[2]

		print("input file : ", inputFile)
		print("output file : ", outputFile)

		#with open("GlobalTemp_TEST.csv") as csv_file:
		with open(inputFile) as csv_file:
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

		with open(outputFile, "w") as jsonFile:
			json.dump(globalData, jsonFile)	

if __name__ == '__main__':
  main()
