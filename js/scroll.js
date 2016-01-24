/*Add your Thank-You great down below
Add a comma after each great you add except the last one*/
(function() {
  var words = [
      '👍 for ➕', //Emoji
      'Ankthay ouyay orfay ontributingcay!', //Pig Latin
      'Спасибо за вклад!',
      'অবদান রাখার জন্য আপনাকে ধন্যবাদ! ',
      'Diolch i chi am gyfrannu!',
      'Bedankt voor het bijdragen!',
      'योगदान के लिए धन्यवाद!',
      'Благодаря за приноса Ви!',
      'Ви благодараме за придонесот!',
      'Go raibh maith agat as cur',
      'දායකවූවාට ස්තුතියි!',
      '感謝您的貢獻！',
      'Kea le leboha ka tlatsetsa!',
      '!شكرا لكم للمساهمة',
      'תודה על התרומה שלך',
      'Cảm ơn bạn đã đóng góp!',
      'Nous vous remercions de votre contribution!',
      'Dziękujemy za współpracę!',
      'યોગદાન માટે આભાર !',
      'Gracias por contribuir!',
      'Berkontribusi untuk Terima kasih!',
      '感谢您的贡献！',
      'ขอขอบคุณในความร่วมมือของคุณ',
      'অবদান রাখার জন্য ধন্যবাদ!',
      'Obrigado por contribuir!',
      'Danke fürs Mitmachen!',
      'Thank you for contributing!',
      'योगदान दिल्याबद्दल धन्यवाद !',
      "qatlho' ghaq!",
      "TY 4 c0ntr1but1n'",
      "Mulțumim pentru contribuție!",
      "Grazie per il tuo contributo!",
      "Tack för att bidra",
      "cảm ơn bạn đã đóng góp",
      "Falemnderit për kontributin!",
      "Hvala na učešću!",
      "貢献していただきありがとうございます！",
      'Tibi gratias dedit quod tu',
      "მადლობა ხელს უწყობს!",
      "ਯੋਗਦਾਨ ਲਈ ਧੰਨਵਾਦ!" ,
      "നൽകുന്നതിന്  താങ്കൾക്കു നന്ദി",
	  'Дякую за внесок!'
    ],
    i = 0;
//Don't modify until you know what you are doing
  setInterval(function() {
    $('#changingword').fadeOut(function() {
      $(this).html(words[i = (i + 1) % words.length]).fadeIn();
    });
  }, 3000);

})();
