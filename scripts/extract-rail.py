import sys, re, json
from pathlib import Path
sys.path.insert(0, '.tmp-pdf')
from pypdf import PdfReader

source = 'https://sacuksprodnrdigital0001.blob.core.windows.net/electronic-national-rail-timetable/electronic%20National%20Rail%20Timetable/01.%20May%202026%20timetable%20documents/London%20North%20West%20Route/Table%20070.pdf'
data = dict(source=source, retrieved='2026-11-08', validFrom='2026-05-17', validTo='2026-12-12', days={})
for page_no, page in enumerate(PdfReader('research/cross-city-may2026.pdf').pages[:14], 1):
    text = page.extract_text(extraction_mode='layout').replace('\xa0', ' ')
    day = 'weekday' if 'Mondays to Fridays' in text else 'saturday' if 'Saturdays' in text else 'sunday'
    entries = data['days'].setdefault(day, [])
    lines = text.splitlines()
    starts = [i for i, line in enumerate(lines) if 'Operator' in line]
    for n, start in enumerate(starts):
        block = lines[start:starts[n+1] if n+1 < len(starts) else len(lines)]
        cols = list(re.finditer(r'\b(?:LM|XC)\b', block[0]))
        def row(station, departure=False):
            return next((line for line in block if f'({station})' in line and (not departure or re.search(r'\bd\s', line))), '')
        rows = [row('BHM', True), row('FWY'), row('UNI')]
        notes = next((line for line in block if 'Days' in line and 'Notes' in line), '')
        for i, col in enumerate(cols):
            left = int((cols[i-1].end()+col.start())/2) if i else col.start()-2
            right = int((col.end()+cols[i+1].start())/2) if i+1<len(cols) else col.end()+4
            def time(line):
                match = re.search(r'(?<!\d)([0-2]\d[0-5]\d)([a-z]?)', line[max(0,left):right])
                return match[1][:2]+':'+match[1][2:] if match else None
            bhm, fwy, uni = map(time, rows)
            if bhm and uni:
                entry=dict(bhm=bhm, fwy=fwy, uni=uni, operator=col[0], page=page_no, note=notes[max(0,left):right].strip())
                if entry not in entries: entries.append(entry)
for day, entries in data['days'].items():
    entries.sort(key=lambda x: (int(x['bhm'][:2]) < 4, x['bhm']))
Path('dist/data/rail-timetable.js').write_text('window.GreenGoRailTimetable='+json.dumps(data, ensure_ascii=False, separators=(',', ':'))+';\n', encoding='utf-8')
print({day: len(entries) for day, entries in data['days'].items()})
