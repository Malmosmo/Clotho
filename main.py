from pathlib import Path
import pickle
import os
from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify


app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent


@app.route("/")
def main():
    return render_template('base.html')


@app.route("/update", methods=["GET"])
def update():
    if request.method == "GET":
        value = request.args.get('value', '')

        if value:
            values = []
            for kvpair in value.split(","):
                kv = kvpair.split(":")

                if len(kv) == 2:
                    key, value = kv

                    if value.isdigit():
                        values.append({
                            "name": key,
                            "value": value
                        })

            with open(BASE_DIR / "data.pkl", "wb") as file:
                pickle.dump({"values": values}, file)

            return jsonify({"status": 200})

    return jsonify({"status": 400})


@app.route("/get")
def get():
    _dict = {}
    if os.path.exists(BASE_DIR / "data.pkl"):
        with open(BASE_DIR / "data.pkl", "rb") as file:
            _dict = pickle.load(file)

    return jsonify(_dict)


if __name__ == "__main__":
    app.run()
