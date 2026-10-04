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
     برای ساعت تابستانی فرانسه +02:00 و برای زمستانی +01:00 است.  ← عوض کنید */
  date: {
    iso: "2027-06-12T16:00:00+02:00",
    timeZone: "Europe/Paris",
    durationHours: 7,            // طول مراسم (برای افزودن به تقویم)
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
    imageMobile: "",
    overlay: 0.5,
    panelOpacity: 0.5,
    position: "center"
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
    lat: 48.8566,
    lng: 2.3522,
    embedUrl: "",
    googleUrl: ""                // اختیاری: لینک اشتراک‌گذاری گوگل‌مپ
  },

  /* ---------- پاسخ به دعوت (RSVP) ----------
     هر کدام را خالی بگذارید، آن دکمه نمایش داده نمی‌شود. اگر هر سه خالی باشد،
     کل بخش حذف می‌شود.
     whatsapp: شماره با کد کشور و بدون + و صفر، مثل 33612345678  ← عوض کنید */
  rsvp: {
    whatsapp: "",
    email: "example@example.com",
    formUrl: "",
    deadline: "2027-05-15"
  },

  /* ---------- برنامه‌ی روز ---------- ← عوض کنید */
  schedule: [
    { time: "16:00",
      title: { fa: "مراسم عقد", en: "Ceremony", fr: "Cérémonie" },
      desc:  { fa: "ورود مهمانان و خطبه‌ی عقد", en: "Arrival of guests and vows", fr: "Accueil des invités et échange des vœux" } },
    { time: "17:30",
      title: { fa: "پذیرایی و عکس", en: "Cocktail & photos", fr: "Vin d'honneur et photos" },
      desc:  { fa: "شربت، شیرینی و عکس یادگاری", en: "Drinks, bites and family photos", fr: "Boissons, bouchées et photos de famille" } },
    { time: "19:30",
      title: { fa: "شام", en: "Dinner", fr: "Dîner" },
      desc:  { fa: "شام در کنار هم", en: "A long table, together", fr: "Un grand dîner à partager" } },
    { time: "22:00",
      title: { fa: "رقص و شادی", en: "Dancing", fr: "Soirée dansante" },
      desc:  { fa: "تا هر وقت که پا دارید", en: "As long as your feet allow", fr: "Tant que les jambes suivent" } }
  ],

  /* ---------- متن‌ها به سه زبان ---------- ← همه را عوض کنید */
  content: {

    fa: {
      meta: { title: "دعوت به جشن پیوند سارا و آرمان" },
      names: ["سارا", "آرمان"],
      sealText: "س · آ",
      tapHint: "برای باز کردن دعوت‌نامه ضربه بزنید",
      topLine: "",                                   // مثلاً «به نام خدا» — خالی = نمایش داده نمی‌شود
      greeting: "{name} عزیز،",                      // وقتی لینک ?guest=نام داشته باشد
      invite: "با شادی و عشق، شما را به جشن پیوند ما دعوت می‌کنیم",
      poem: [
        "ای که با تو جهان بهار شد",
        "دل ز مهرت امیدوار شد",
        "دست در دست هم نهادیم اینک",
        "عشق ما تا ابد پایدار شد"
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
        address: "خیابان و شماره\nکد پستی، شهر",
        google: "مسیریابی با گوگل‌مپ",
        apple: "اپل مپ",
        waze: "ویز"
      },
      schedule: { title: "برنامه‌ی روز" },
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
      sealText: "S & A",
      tapHint: "Tap to open your invitation",
      topLine: "",
      greeting: "Dear {name},",
      invite: "With joy and love, we invite you to celebrate our wedding",
      poem: [
        "With you, the world has turned to spring,",
        "and hope within my heart takes wing;",
        "now hand in hand we start our way,",
        "a love that grows with every day."
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
        address: "Street and number\nPostcode, City",
        google: "Directions in Google Maps",
        apple: "Apple Maps",
        waze: "Waze"
      },
      schedule: { title: "Order of the day" },
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
      footer: "With love, Sara & Arman",
      ui: { music: "Music", open: "Open the invitation" }
    },

    fr: {
      meta: { title: "Vous êtes invités — Sara & Arman" },
      names: ["Sara", "Arman"],
      sealText: "S & A",
      tapHint: "Touchez pour ouvrir l'invitation",
      topLine: "",
      greeting: "Cher·e {name},",
      invite: "Avec joie et amour, nous vous invitons à célébrer notre mariage",
      poem: [
        "Avec toi, le monde est devenu printemps,",
        "et mon cœur, d'espoir, chante en même temps ;",
        "main dans la main, nous commençons ce jour",
        "un chemin que scelle un éternel amour."
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
        address: "Rue et numéro\nCode postal, Ville",
        google: "Itinéraire Google Maps",
        apple: "Plans (Apple)",
        waze: "Waze"
      },
      schedule: { title: "Programme de la journée" },
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
      footer: "Avec tout notre amour, Sara & Arman",
      ui: { music: "Musique", open: "Ouvrir l'invitation" }
    }
  }
};
