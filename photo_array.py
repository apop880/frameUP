import os, os.path
import random
import json

list_dir = []
slides = []
list_dir = os.listdir("/root/frameup/public/bg_images")
for file in list_dir:
    slides.append("bg_images/"+file)

random.shuffle(slides)

with open("/root/frameup/public/slideshow.json", "w") as filehandle:
    json.dump(slides, filehandle)