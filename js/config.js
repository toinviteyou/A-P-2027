/* =====================================================================
   تنظیمات کارت عروسی — فقط همین فایل را ویرایش کنید
   =====================================================================
   هر جا نوشته «← عوض کنید» یعنی مقدار نمونه است و باید با اطلاعات خودتان
   جایگزین شود. بعد از هر تغییر، صفحه را در مرورگر رفرش کنید.
   ===================================================================== */

window.WEDDING_CONFIG = {

  /* زبان‌های موجود و زبان پیش‌فرض. برای حذف یک زبان، آن را از آرایه بردارید. */
  languages: ["fa", "en", "fr"],
  defaultLang: "fa",

  /* ---------- تاریخ و ساعت ----------
     iso: تاریخ و ساعت شروع، به‌صورت سال-ماه-روزTساعت:دقیقه:ثانیه+اختلاف‌ساعت
     ساعت را به وقت محل مراسم بنویسید. ایران: +03:30 (و timeZone: "Asia/Tehran").
     برای مثال فرانسه: تابستان +02:00 و زمستان +01:00 (و timeZone: "Europe/Paris"). */
  date: {
    iso: "2027-01-01T19:00:00+03:30",   // ۱ ژانویه‌ی ۲۰۲۷ (۱۱ دی ۱۴۰۵)، ساعت ۱۹:۰۰ به وقت ایران
    timeZone: "Asia/Tehran",
    durationHours: 5,            // طول مراسم (برای افزودن به تقویم): ۱۹:۰۰ تا ۲۴:۰۰
    showSecondaryDate: true,     // در نسخه‌ی فارسی، تاریخ میلادی را هم زیر تاریخ شمسی نشان بده
    // اگر می‌خواهید تاریخ را خودتان بنویسید (به‌جای محاسبه‌ی خودکار)، اینجا بنویسید:
    customText: { fa: "", en: "", fr: "" }
  },

  /* ---------- عکس پس‌زمینه ----------
     عکس خودتان را در assets/images بگذارید و نامش را اینجا بنویسید.
     (پیشنهاد: JPG، عرض حدود ۱۹۰۰ پیکسل، حجم زیر ۵۰۰ کیلوبایت)
     imageMobile اختیاری است: عکس عمودی مخصوص گوشی.
     overlay: تیرگی روی عکس بین ۰ تا ۱ (برای خوانایی بهتر متن). */
  background: {
    image: "assets/images/background.jpg",
    imageMobile: "assets/images/background-mobile.jpg",
    overlay: 0.5,
    // شفافیت «کاغذ» روی عکس: ۱ = کاملاً مات، ۰.۷ = عکس بیشتر دیده می‌شود (کمتر از ۰.۶۵ خواندن متن سخت می‌شود)
    panelOpacity: 0.6,
    position: "center top"
  },

  /* ---------- تزئینات ----------
     vine: ساقه، برگ و گل دور طاق دعوت‌نامه. برای خاموش‌کردن false بگذارید. */
  decoration: {
    vine: true
  },

  /* ---------- موسیقی ----------
     type: "file"    → فایل mp3 شما در assets/music   (مطمئن‌ترین راه، پیشنهاد من)
     type: "youtube" → فقط شناسه‌ی ویدیو (مثلاً از لینک youtube.com/watch?v=ABC123 مقدار ABC123)
     نکته: مرورگرها اجازه نمی‌دهند موسیقی بدون لمس کاربر پخش شود؛ به همین خاطر
     موسیقی لحظه‌ای شروع می‌شود که مهمان پاکت را باز می‌کند. */
  music: {
    type: "file",
    src: "assets/music/song.mp3",
    youtubeId: "",
    volume: 0.6,
    startAt: 0                   // ثانیه‌ی شروع
  },

  /* ---------- مکان ----------
     lat و lng را از گوگل‌مپ بگیرید: روی نقطه راست‌کلیک (یا لمس طولانی) کنید و
     دو عدد بالای منو را کپی کنید.  ← عوض کنید
     اگر کد «Embed» گوگل‌مپ را دارید، فقط آدرس src آن را در embedUrl بگذارید. */
  venue: {
    lat: 27.396213,              // مختصات Plus Code «9CW9+F8Q» (سرخون، هرمزگان)
    lng: 56.418359,
    embedUrl: "",
    // دکمه‌ی «مسیریابی گوگل» مستقیم با همان Plus Code باز می‌شود
    googleUrl: "https://www.google.com/maps/search/?api=1&query=9CW9%2BF8Q%20Sarkhun%2C%20Hormozgan%20Province%2C%20Iran"
  },

  /* ---------- پاسخ به دعوت (RSVP) ----------
     هر کدام را خالی بگذارید، آن دکمه نمایش داده نمی‌شود. اگر هر سه خالی باشد،
     کل بخش حذف می‌شود.
     whatsapp: شماره با کد کشور و بدون + و صفر، مثل 33612345678  ← عوض کنید */
  rsvp: {
    whatsapp: "",
    email: "example@example.com",
    formUrl: "",
    deadline: "2026-12-10"       // ۱۹ آذر ۱۴۰۵ (به میلادی بنویسید؛ در نسخه‌ی فارسی خودکار شمسی می‌شود)
  },

  /* ---------- برنامه‌ی شامگاهی ---------- */
  schedule: [
    { time: "19:00",
      title: { fa: "شروع", en: "The evening begins", fr: "Le début de la soirée" },
      desc:  { fa: "ورود مهمانان", en: "Arrival of the guests", fr: "Accueil des invités" } },
    { time: "20:00",
      title: { fa: "پذیرایی و احوال‌پرسی", en: "Greetings and refreshments", fr: "Retrouvailles et rafraîchissements" },
      desc:  { fa: "شربت، چای و شیرینی", en: "Sherbet, tea and sweets", fr: "Sharbat, thé et douceurs" } },
    { time: "21:00",
      title: { fa: "شام", en: "Dinner", fr: "Dîner" },
      desc:  { fa: "شام در کنار هم", en: "Dinner, all together", fr: "Un dîner tous ensemble" } },
    { time: "22:00",
      title: { fa: "رقص و شادی", en: "Dancing and joy", fr: "Danse et joie" },
      desc:  { fa: "تا هر وقت که پا دارید", en: "For as long as your feet will carry you", fr: "Tant que vos jambes vous porteront" } }
  ],

  /* ---------- متن‌ها به سه زبان ---------- ← همه را عوض کنید */
  content: {

    fa: {
      meta: { title: "دعوت به جشن پیوند سارا و آرمان" },
      names: ["سارا", "آرمان"],
      sealText: "س و آ",
      tapHint: "برای باز کردن دعوت‌نامه ضربه بزنید",
      topLine: "",                                   // مثلاً «به نام خدا» — خالی = نمایش داده نمی‌شود
      greeting: "{name} عزیز،",                      // وقتی لینک ?guest=نام داشته باشد
      invite: "",
      poem: [
        "زیباترین تصمیم زندگی‌مان را گرفته‌ایم.",
        "از شما صمیمانه دعوت می‌کنیم تا در جشن مهم زندگی‌مان، کنار هم باشیم."
      ],
      poemBy: "",                                    // نام شاعر (اگر شعر از شاعری دیگر است)
      timeLabel: "ساعت {time}",
      countdown: {
        title: "تا روز عروسی",
        days: "روز", hours: "ساعت", minutes: "دقیقه", seconds: "ثانیه",
        done: "امروز روز بزرگ ماست!",
        after: "سپاس از اینکه شادی ما را شریک شدید"
      },
      venue: {
        title: "محل برگزاری",
        name: "نام سالن یا باغ",
        address: "سرخون، استان هرمزگان\nایران",
        google: "مسیریابی با گوگل‌مپ",
        apple: "اپل مپ",
        waze: "ویز"
      },
      schedule: { title: "برنامه‌ی شامگاهی" },
      rsvp: {
        title: "حضور شما شادی ماست",
        text: "لطفاً تا {deadline} حضورتان را به ما اطلاع دهید.",
        whatsapp: "پیام در واتس‌اپ",
        email: "ارسال ایمیل",
        form: "پر کردن فرم",
        whatsappMsg: "سلام! {guest} در جشن عروسی سارا و آرمان حضور خواهم داشت.",
        emailSubject: "پاسخ به دعوت عروسی"
      },
      calendar: {
        add: "افزودن به تقویم",
        google: "گوگل کالندر",
        eventTitle: "عروسی سارا و آرمان",
        eventDesc: "با شادی منتظر شما هستیم."
      },
      footer: "با عشق، سارا و آرمان",
      ui: { music: "موسیقی", open: "باز کردن دعوت‌نامه" }
    },

    en: {
      meta: { title: "You're invited — Sara & Arman" },
      names: ["Sara", "Arman"],
      sealText: "S · A",
      tapHint: "Tap to open your invitation",
      topLine: "",
      greeting: "Dear {name},",
      invite: "",
      poem: [
        "We have made the most beautiful decision of our lives.",
        "We warmly invite you to be at our side as we celebrate this important day of our lives."
      ],
      poemBy: "",
      timeLabel: "at {time}",
      countdown: {
        title: "Until our wedding day",
        days: "days", hours: "hours", minutes: "minutes", seconds: "seconds",
        done: "Today is the day!",
        after: "Thank you for sharing our joy"
      },
      venue: {
        title: "Venue",
        name: "Name of the venue",
        address: "Sarkhun, Hormozgan Province\nIran",
        google: "Directions in Google Maps",
        apple: "Apple Maps",
        waze: "Waze"
      },
      schedule: { title: "Evening programme" },
      rsvp: {
        title: "Your presence is our joy",
        text: "Please let us know by {deadline} if you can join us.",
        whatsapp: "Message on WhatsApp",
        email: "Send an email",
        form: "Fill in the form",
        whatsappMsg: "Hello! {guest} will be at Sara & Arman's wedding.",
        emailSubject: "Wedding RSVP"
      },
      calendar: {
        add: "Add to calendar",
        google: "Google Calendar",
        eventTitle: "Sara & Arman's wedding",
        eventDesc: "We can't wait to celebrate with you."
      },
      footer: "With love, Sara and Arman",
      ui: { music: "Music", open: "Open the invitation" }
    },

    fr: {
      meta: { title: "Vous êtes invités — Sara & Arman" },
      names: ["Sara", "Arman"],
      sealText: "S · A",
      tapHint: "Touchez pour ouvrir l'invitation",
      topLine: "",
      greeting: "Cher·e {name},",
      invite: "",
      poem: [
        "Nous avons pris la plus belle décision de notre vie.",
        "Nous vous invitons de tout cœur à nous rejoindre pour célébrer, à nos côtés, ce jour important de notre vie."
      ],
      poemBy: "",
      timeLabel: "à {time}",
      countdown: {
        title: "Avant le grand jour",
        days: "jours", hours: "heures", minutes: "minutes", seconds: "secondes",
        done: "C'est aujourd'hui le grand jour !",
        after: "Merci d'avoir partagé notre joie"
      },
      venue: {
        title: "Lieu",
        name: "Nom du lieu",
        address: "Sarkhun, province d'Hormozgan\nIran",
        google: "Itinéraire Google Maps",
        apple: "Plans (Apple)",
        waze: "Waze"
      },
      schedule: { title: "Programme de la soirée" },
      rsvp: {
        title: "Votre présence nous comble",
        text: "Merci de nous répondre avant le {deadline}.",
        whatsapp: "Écrire sur WhatsApp",
        email: "Envoyer un e-mail",
        form: "Remplir le formulaire",
        whatsappMsg: "Bonjour ! {guest} sera présent·e au mariage de Sara & Arman.",
        emailSubject: "Réponse – mariage"
      },
      calendar: {
        add: "Ajouter à l'agenda",
        google: "Google Agenda",
        eventTitle: "Mariage de Sara & Arman",
        eventDesc: "Nous avons hâte de fêter ça avec vous."
      },
      footer: "Avec tout notre amour, Sara et Arman",
      ui: { music: "Musique", open: "Ouvrir l'invitation" }
    }
  }
};
