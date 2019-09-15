import json
import boto3
import operator

CLIENT = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    try:
        parameters = getParameters(event)
        data = getData()
        matches = findMatches(data, parameters)
        sorted_matches = sortMatches(matches)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(sorted_matches)
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'Access-Control-Allow-Origin': '*',
            'body': str(e)
        }
    
   
    
def getParameters(event): 
    raw_parameters = event['queryStringParameters']
    boolean_parameters = {}
    
    for key, value in raw_parameters.items():
        boolean_parameters[key] = bool(value)  
        
    return boolean_parameters
    
def getData():
    response = CLIENT.scan(
        TableName='creditcards',
    )
    items = response['Items']
    data = []
    
    for item in items:
        row = {}
        
        for key, value in item.items():
            if key != "id":
                row[key.lower()] = list(value.values())[0]
        
        data.append(row)    
        
    return data
    
    
def findMatches(data, parameters):
    matches = {}
    
    for row in data:
        points = 0
        matches[row['name']] = {
            'name': row['name']
        }
        
        for key, value in parameters.items():
            matches[row['name']][key] = False
            
            if row[key] == value:
                points += 1
                matches[row['name']][key] = True

        if points == 0:
            del matches[row['name']]
        else:
            matches[row['name']]['points'] = points
                
    return matches
    
def sortMatches(matches):
    sorted_keys = sortKeys(matches)
    sorted_matches = []
   
    for index, key in enumerate(sorted_keys):
        sorted_matches.append(matches[key[0]])

    return sorted_matches
        
def sortKeys(matches):
    unsorted_keys = {}
    
    for key, value in matches.items():
        unsorted_keys[key] = value['points']

    sorted_keys = sorted(unsorted_keys.items(), key=lambda unsorted_keys: unsorted_keys[1], reverse=True)
    
    return sorted_keys

