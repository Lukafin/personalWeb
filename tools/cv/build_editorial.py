"""Build one English, Slovenian or German Editorial CV from maintained content.

Requires reportlab and the same Arial/Georgia fonts as the approved Editorial CV.
Only the selected Editorial language is written; other design variants are never modified.
"""
import argparse
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--language', choices=['en', 'sl', 'de'], default='sl')
parser.add_argument('--output')
parser.add_argument('--font-dir', default='/System/Library/Fonts/Supplemental')
args = parser.parse_args()
if not args.output:
    suffix = '' if args.language == 'en' else f'-{args.language}'
    args.output = str(Path(__file__).resolve().parents[2] / f'assets/cv/luka-finzgar-cv{suffix}.pdf')
content = json.loads(Path(__file__).with_name(f'content-{args.language}.json').read_text())
contacts = content['contacts']; profile = content['profile']; themes = content['themes']; roles = content['roles']; blog = content['blog']
themes = [dict(t, items=t['items']) for t in themes]
# Preserve each approved language's original paragraph spacing.
spacing = {
    'en': dict(rule=19, profile=8, themes=8, title=4, meta=4, body=4, after=3),
    'sl': dict(rule=15, profile=6, themes=6, title=3, meta=3, body=3, after=2),
    'de': dict(rule=15, profile=4, themes=4, title=2, meta=3, body=3, after=2),
}[args.language]
W,H=A4
for name,filename in [('Sans','Arial.ttf'),('SansBold','Arial Bold.ttf'),('SansItalic','Arial Italic.ttf'),('Serif','Georgia.ttf'),('SerifBold','Georgia Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(Path(args.font_dir)/filename)))
pdfmetrics.registerFontFamily('Sans',normal='Sans',bold='SansBold',italic='SansItalic',boldItalic='SansBold')
INK='#183536'; PETROL='#225C5D'; WARM='#B67746'; MUTED='#526265'; LIGHT='#DEE6E3'; PAPER='#F7F5EF'

class Draw:
 def __init__(self,c,accent=PETROL):self.c=c;self.accent=accent
 def p(self,text,x,y,width,font='Sans',size=10.1,leading=13.6,color=INK,gap=0,dry=False):
  text=text.replace('#176A67',self.accent)
  style=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading,textColor=colors.HexColor(color))
  p=Paragraph(text,style);_,height=p.wrap(width,H)
  if not dry:
   if y-height<53:raise ValueError(f'Overflow at {y-height:.1f}: {text[:55]}')
   p.drawOn(self.c,x,y-height)
  return y-height-gap
 def label(self,text,x,y,color=PETROL,size=8.3):
  self.c.saveState()
  self.c.setFillColor(colors.HexColor(color));self.c.setFont('SansBold',size)
  t=self.c.beginText(x,y);t.setCharSpace(1.15);t.textOut(text.upper());self.c.drawText(t)
  self.c.restoreState()
 def line(self,x,y,x2,color=LIGHT,width=.6):
  self.c.setStrokeColor(colors.HexColor(color));self.c.setLineWidth(width);self.c.line(x,y,x2,y)
 def footer(self,page,modern=False):
  self.line(40,37,W-40)
  self.c.setFont('Sans',8);self.c.setFillColor(colors.HexColor(MUTED))
  self.c.drawString(40,23,'Luka Finžgar  /  '+content['position'])
  self.c.setFont('SansBold',8);self.c.drawRightString(W-40,23,f'{page:02d} / 02')
 def bullet(self,text,x,y,width,size=10.1,leading=13.6,gap=4):
  self.c.setFillColor(colors.HexColor(self.accent));self.c.circle(x+1.4,y-5.8,1.1,fill=1,stroke=0)
  return self.p(text,x+10,y,width-10,size=size,leading=leading,gap=gap)

def metadata(c,name):
 c.setTitle('Luka Finžgar | '+{'en':'Editorial CV','sl':'Življenjepis','de':'Lebenslauf'}[args.language]);c.setAuthor('Luka Finžgar')
 c.setSubject('Senior software engineer: mobile products, AI agent systems and current explorations' if args.language == 'en' else content['position']+' | '+content['contacts'][0])
 if args.language != 'en':c.setCatalogEntry('Lang', {'sl': 'sl-SI', 'de': 'de-DE'}[args.language])

def editorial():
 out=Path(args.output);c=canvas.Canvas(str(out),pagesize=A4);metadata(c,'Editorial');d=Draw(c)
 left=42;right=W-42;width=right-left
 d.label(content['eyebrow'],left,H-35)
 c.setFillColor(colors.HexColor(INK));c.setFont('Serif',42);c.drawString(left,H-90,'Luka Finžgar')
 d.label(content['position'],left,H-117,size=10)
 y=d.p(contacts[0],left,H-131,width,size=10.3,leading=14,color=MUTED,gap=13)
 y=d.p(contacts[1],left,y,width,size=9.4,leading=13,color=MUTED,gap=3)
 y=d.p(contacts[2],left,y,width,size=9.4,leading=13,color=MUTED,gap=11)
 d.line(left,y,right,PETROL,.9);y-=spacing['rule']
 d.label(content['profile_heading'],left,y);y-=13
 y=d.p(profile,left,y,width,size=10.65,leading=14.8,gap=spacing['profile'])
 y=d.p(content['themes_heading'],left,y,width,font='Serif',size=20,leading=24,gap=spacing['themes'])
 for i,t in enumerate(themes,1):
  d.label(f'{i:02d}',left,y-12,color=WARM,size=8.5)
  x=left+27;tw=width-27
  y=d.p(t['title'],x,y,tw,font='SerifBold',size=12.6,leading=16,gap=spacing['title'])
  y=d.p(t['meta'],x,y,tw,size=8.8,leading=11.8,color=MUTED,gap=spacing['meta'])
  for bul,text in t['items']:
   y=d.bullet(text,x,y,tw,size=9.8,leading=13.25,gap=spacing['body']) if bul else d.p(text,x,y,tw,size=9.8,leading=13.25,gap=spacing['body'])
  y-=spacing['after']
 y=d.p(blog,left+27,y,width-27,size=8.9,leading=12,color=MUTED)
 print('Editorial page 1 bottom:',round(y,1));d.footer(1);c.showPage()
 d.label(content['career_eyebrow'],left,H-35)
 y=d.p(content['career_heading'],left,H-55,width,font='Serif',size=25,leading=31,gap=8)
 y=d.p(content['career_intro'],left,y,width,size=9.7,leading=14,color=MUTED,gap=18)
 for company,title,date,text in roles:
  c.setFont('Sans',8.8);c.setFillColor(colors.HexColor(MUTED));c.drawRightString(right,y-10,date)
  y=d.p(company+' <font name="Sans" size="8.5" color="'+MUTED+'"> / '+title+'</font>',left,y,width-135,font='SerifBold',size=11.6,leading=14.5,gap=5)
  y=d.p(text,left,y,width,size=9.5,leading=12.7,gap=10)
 for sec,text in content['sections']:
  y-=3;d.line(left,y,right);y-=16;d.label(sec,left,y);y-=13
  y=d.p(text,left,y,width,size=9.45,leading=12.5,gap=8)
 print('Editorial page 2 bottom:',round(y,1));d.footer(2);c.save();return out

if __name__ == '__main__':
 print(editorial())
