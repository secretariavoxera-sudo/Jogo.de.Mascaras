import sys

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Scroll to top (Already applied, but good to check)
old1 = 'P.useEffect(()=>{Q1(f)},[f]),P.useEffect(()=>{window.scrollTo(0,0)},[l]);const k=()'
if old1 not in content:
    # If not yet applied, try the original version
    old1_orig = 'P.useEffect(()=>{Q1(f)},[f]);const k=()'
    new1 = 'P.useEffect(()=>{Q1(f)},[f]),P.useEffect(()=>{window.scrollTo(0,0)},[l]);const k=()'
    content = content.replace(old1_orig, new1)
    print('Fix 1 applied or updated')

# Fix 2: Locked topic UI and interaction
# We'll use a more flexible replacement
search_term = 'className:`p-4 h-auto text-left whitespace-normal break-words leading-snug flex justify-between items-center ${ot?"bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed opacity-70":"bg-orange-500 hover:bg-orange-600 text-white"}`'
replace_term = 'className:`p-4 h-auto text-left whitespace-normal break-words leading-snug flex justify-between items-center ${ot?"bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed opacity-70 pointer-events-none":"bg-orange-500 hover:bg-orange-600 text-white"}`'

content = content.replace(search_term, replace_term)

search_children = 'children:[g.jsx("span",{"data-loc":"client/src/components/GameContainer.tsx:766",children:ie})'
replace_children = 'children:[g.jsx("span",{"data-loc":"client/src/components/GameContainer.tsx:766",children:ot?"Conteúdo Bloqueado":ie})'

content = content.replace(search_children, replace_children)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Applied changes')
