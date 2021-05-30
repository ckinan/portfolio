# ckinan.com

The source code of my personal website.

```
pip3 freeze > requirements.txt
pip3 install -r requirements.txt
python3 generate.py
# see dependency hierarchy
$ pipdeptree
pip freeze | xargs pip uninstall -y

# https://djangocentral.com/how-to-a-create-virtual-environment-for-python/
python3 -m venv venv
source venv/bin/activate
deactivate

# https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
cd public
python3 -m http.server
```

## Links
- https://validator.w3.org/feed/docs/rss2.html
- https://validator.w3.org/feed/docs/atom.html