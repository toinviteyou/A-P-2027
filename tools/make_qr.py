#!/usr/bin/env python3
"""ساخت QR کد برای کارت عروسی (و لینک اختصاصی هر مهمان).

نصب:      pip install qrcode[pil]
یک QR:    python tools/make_qr.py https://USERNAME.github.io/REPO/
برای مهمان‌ها:
          python tools/make_qr.py https://USERNAME.github.io/REPO/ --guests guests.txt --lang fa
          (فایل guests.txt: هر نام در یک خط)
"""
import argparse
import os
import re
from urllib.parse import quote

try:
    import qrcode
    from qrcode.constants import ERROR_CORRECT_M
except ImportError:
    raise SystemExit("ابتدا نصب کنید:  pip install qrcode[pil]")


def make(url, path):
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_M, box_size=14, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image(fill_color="#3a2142", back_color="white").save(path)


def safe_name(name):
    return re.sub(r"[^\w\-]+", "_", name, flags=re.UNICODE).strip("_") or "guest"


def main():
    ap = argparse.ArgumentParser(description="QR code generator for the wedding card")
    ap.add_argument("url", help="آدرس صفحه، مثل https://USERNAME.github.io/REPO/")
    ap.add_argument("--guests", help="فایل متنی با نام مهمان‌ها (هر خط یک نام)")
    ap.add_argument("--lang", choices=["fa", "en", "fr"], help="زبان پیش‌فرض لینک‌ها")
    ap.add_argument("--out", default="qr", help="پوشه‌ی خروجی (پیش‌فرض: qr)")
    a = ap.parse_args()

    os.makedirs(a.out, exist_ok=True)
    base = a.url.rstrip("/") + "/"

    if not a.guests:
        url = base + (f"?lang={a.lang}" if a.lang else "")
        path = os.path.join(a.out, "qr.png")
        make(url, path)
        print(f"{path}  ←  {url}")
        return

    lines = []
    with open(a.guests, encoding="utf-8") as f:
        names = [n.strip() for n in f if n.strip()]
    for n in names:
        url = base + "?guest=" + quote(n)
        if a.lang:
            url += "&lang=" + a.lang
        make(url, os.path.join(a.out, safe_name(n) + ".png"))
        lines.append(f"{n}\t{url}")
    with open(os.path.join(a.out, "links.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{len(names)} QR در پوشه‌ی {a.out}/ ساخته شد. فهرست لینک‌ها: {a.out}/links.txt")


if __name__ == "__main__":
    main()
