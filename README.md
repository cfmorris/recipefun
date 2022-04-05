# recipefun
Present recipes with simple JavaScript search tools.

This project scraped my favorite cooking blog and presented all the recipes on a local page with some fun features that arent available normally. The data is stored in a .js file and is loaded into the browser cache making the initial load fairly slow. However, once it is loaded all recipes can be accessed by a single autocomplete bar. Javascript updates the page dynamically so there is never a need to reload.

The dataset has been trimmed down for proof of concept.

Really it was just to learn javascript and sharpen my python webscraping skills.

# how to use

1. Tailor the scraper to your desired website.  This will involve inputting the prooper urls, making sure it iterates through each page of the search tool, and confirming that beautiful soup is pulling content from the appropriate tags.
2. Make sure the data is formatted appropriately: URLS, ingredients(a list), directions, image urls, etc.
3. Save all files in the same directory.
4. Run the html page in a web browser.

# needs work:
- all the styling
- use a database!
- figure out why directions become disordered.
- really, just recreate the thing in rails.
