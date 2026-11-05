import sys,json
# usage: python rep.py file.json  -> [[file, old, new],...]
for f,o,n in json.load(open(sys.argv[1],encoding='utf8')):
    s=open(f,encoding='utf8').read()
    if o not in s: print('MISS',f,o[:60]); continue
    open(f,'w',encoding='utf8').write(s.replace(o,n,1)); print('ok',o[:40])
