from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
from demo_data import demo_reccomendations, demo_data
import json 
import requests

app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})



recomended = {"rec": []}

@app.route('/anime')
def get_dictionary():
    return jsonify(demo_data)

@cache.cached(timeout=60)
@app.route('/recommendation', methods=["POST"])
def process():
    id = None
    name = request.form.get("name")
    for dic in demo_data["key"]:
        if (dic["title"] == name):
            id = dic["id"]
    print(id)
    if id is None:
        return "error" 

    link = f"https://api.jikan.moe/v4/anime/{id}/recommendations"
    
    r = requests.get(link).text
    r = json.loads(r)
    animes = r["data"]

    
    for anime in animes:
        anime_list = {}
        anime = anime["entry"]
        id = anime["mal_id"]
        title = anime["title"]
        med_img_url = anime["images"]["jpg"]["image_url"]
        lg_img_url = anime["images"]["jpg"]["large_image_url"]
        # synop = anime["synopsis"]
        anime_list["id"] = id
        anime_list["title"] = title
        anime_list["med_img_url"] = med_img_url
        anime_list["lg_img_url"] = lg_img_url
        recomended['rec'].append(anime_list)

        # print(f"ID: {id}, Title: {title}, med_img_url: {med_img_url}, lg_img_url: {lg_img_url}\n")

    total_count = len(animes)
    print(f"Total count: {total_count}")
    print(recomended)
    return ("", 204)

@app.route('/getRecomended')
def getRecomended():
    return jsonify(recomended)
# @app.route("/recommendations/<id>")
# def get_anime_rec_by_id(id):

    link = f"https://api.jikan.moe/v4/anime/{id}/recommendations"

    r = requests.get(link).text
    r = json.loads(r)
    animes = r["data"]

    rec = []
    for anime in animes:
        anime_list = {}
        anime = anime["entry"]

        id = anime["mal_id"]
        title = anime["title"]
        med_img_url = anime["images"]["jpg"]["image_url"]
        lg_img_url = anime["images"]["jpg"]["large_image_url"]

        anime_list["id"] = id
        anime_list["title"] = title
        anime_list["med_img_url"] = med_img_url
        anime_list["lg_img_url"] = lg_img_url

        rec.append(anime_list)

        # print(f"ID: {id}, Title: {title}, med_img_url: {med_img_url}, lg_img_url: {lg_img_url}\n")

    total_count = len(animes)
    print(f"Total count: {total_count}")
    return {
        "recommendations": rec
    }
if __name__ == '__main__':
    app.run()
    
