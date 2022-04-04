import requests
import time
import pandas
from bs4 import BeautifulSoup, SoupStrainer
import re
columns = ["url", "title", "ingredientRows","instructions","images"]
ingColumns = ["key value", "ingredient"]
budget_bytes_df = pandas.DataFrame(columns=columns)
ingredient_df = pandas.DataFrame(columns=ingColumns)
target=[]
for n in range(25):
    n +=1
    query = "https://www.INSERT_ADDRESS.com/page/" + str(n) + "/?s"
    page = requests.get(query)
    soup = BeautifulSoup(page.text, features="html.parser")
    for div in soup.findAll(name="div", attrs={"class":"more"}):
        tgt = []
        for link in div.findAll("a"):
            tgt.append(link.get('href'))
        
        for item in range(len(tgt)):
            tgt[item] = tgt[item].strip()
            target.append(tgt[item])
    time.sleep((.25))
recipe = []
x = ""
m= ""
def delist(r):
    x=""
    m = str(r)
    for c in m:
        if c != "'" and c != "[" and c != "]":
            x += c
    return x
def striprecipe(x):
    b =[]
    l=[]     
    b = x
    for item in b:
        l.append(delist(item.contents))
    return l
    
    
title = ""
url = ""
ingredientRow = []
instruction = []
src = []
skipped = []
p = 0
# target=['https://www.INSERT_ADDRESS.com/freezer-breakfast-burritos/']         
   
for i in range(len(target)):
    time.sleep(.25)
    page = requests.get(target[i])
    recipe = []
    soup = BeautifulSoup(page.text, features="html.parser")
    ingredientRow = []
    
    try: 
        title = delist(soup.find(name="h2", attrs={"class":"wprm-recipe-name wprm-
block-text-bold"}).contents)
        url = target[i]
        instruction = striprecipe(soup.find_all(name="div", attrs={"class":"wprm-
recipe-instruction-text"}))
        instruction = {x.replace('<span style="display: block;">', 
'').replace('</span>', '') for x in instruction}
        
        for div in soup.findAll(name="li", attrs={"class": "wprm-recipe-
ingredient"}):
            qty = striprecipe(div.find_all(name="span", attrs={"class":"wprm-
recipe-ingredient-amount"}))
            unit = striprecipe(div.find_all(name="span", attrs={"class":"wprm-
recipe-ingredient-unit"}))
            ingredient = striprecipe(div.find_all(name="span", 
attrs={"class":"wprm-recipe-ingredient-name"}))
            ingredientRowSingle = (qty + unit + ingredient)
            if len(ingredientRowSingle) == 2:
                ingredientRowSingle.insert(1,'')
            ingredient_df.loc[(len(ingredient_df)+1)] = [p, ingredient]
            ingredientRow.append(ingredientRowSingle)
        src = []
        for image in soup.find_all("img",{'src':re.compile('.jpg')}):
            src.append(image['src'])
        src = src[0:2]
            
        recipe.append(url) 
        recipe.append(title)
        recipe.append(ingredientRow)
        recipe.append(instruction)
        recipe.append(src)
        p += 1
        
        num = (len(budget_bytes_df) + 1)
        budget_bytes_df.loc[num] = recipe
        print(num, "of", len(target), title, target[i])
    except:
        skipped.append(target[i])
budget_bytes_df.to_json("recipe_scraper_v3.json")
