#!/bin/bash
# Update imagePaths, compress new images, commit, and redeploy
set -e
cd /Users/banseiyuuji/Desktop/irasutoya_clone

echo "=== Updating imagePaths ==="
python3 -c "
import json, os
with open('data/illustrations.json') as f:
    data = json.load(f)
img_dir = 'public/images/illustrations'
existing = set(os.listdir(img_dir))
updated = 0
for item in data:
    fname = f\"{item['id']}.png\"
    if fname in existing and not item.get('imagePath'):
        item['imagePath'] = f'/images/illustrations/{fname}'
        updated += 1
with open('data/illustrations.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
has_img = sum(1 for d in data if d['imagePath'])
print(f'Updated {updated} paths. Total with image: {has_img}/{len(data)}')
"

echo "=== Compressing new PNGs ==="
find public/images/illustrations/ -name "*.png" -newer .git/index -exec pngquant --force --quality=65-85 --ext .png --skip-if-larger {} + 2>/dev/null || true

echo "=== Git commit & push ==="
git add -A
git commit -m "update: add newly generated illustration images

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>" || echo "Nothing to commit"
git push origin main

echo "=== Deploying to Vercel ==="
npx vercel --prod --yes 2>&1 | tail -10

echo "=== Done ==="
