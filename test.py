import requests, json

URL = "https://api.jikan.moe/v4"

def get_anime_by_id(id):
    link = f"{URL}/anime/{id}/recommendations"
    r = requests.get(link).text
    r = json.loads(r)
    
    for i in range(len(r["data"])):
        print(r["data"][i]["entry"]["mal_id"])

    # r = r["data"][1]["entry"]["title"]
    # print()

get_anime_by_id(id=28223)