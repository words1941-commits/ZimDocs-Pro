import { jsPDF } from 'jspdf'
export async function saveDocAsPdf(data){
  const doc = new jsPDF({unit:'pt',format:'a4'})
  doc.setFontSize(18)
  doc.text(data.name || 'Name', 40, 60)
  doc.setFontSize(11)
  doc.text('Email: ' + (data.email||''), 40, 86)
  doc.text('Phone: ' + (data.phone||''), 40, 102)
  doc.setFontSize(12)
  doc.text('Summary:', 40, 140)
  doc.setFontSize(10)
  doc.text((data.summary||''), 40, 160, {maxWidth:500})
  doc.text('Education:', 40, 320)
  doc.text((data.education||''), 40, 340, {maxWidth:500})
  doc.text('Experience:', 40, 460)
  doc.text((data.experience||''), 40, 480, {maxWidth:500})
  doc.save((data.name||'resume') + '.pdf')
}
