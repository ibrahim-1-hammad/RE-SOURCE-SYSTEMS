import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from premailer import Premailer

# ------------------------------------------------------------------
# --- 1. إعداد المتغيرات الأساسية (لإعداد النظام - لا يتم تعديلها إلا عند الحاجة) ---
# ------------------------------------------------------------------
SMTP_SERVER = 'smtp.yourserver.com'
SMTP_PORT = 587
SENDER_EMAIL = 'your_email@resource-systems.com'
SENDER_PASSWORD = 'Your_Secure_App_Password' 
RECEIVER_EMAIL = 'recipient@example.com'

# ------------------------------------------------------------------
# --- 2. البيانات القابلة للتعديل (المحتوى فقط) ---
# **هذا هو القاموس الوحيد الذي يجب تعديله لتغيير محتوى الإيميل**
# ------------------------------------------------------------------
template_data = {
    'recipient_name': 'عميلنا العزيز', 
    'title': 'ندعوك للمشاركة في مبادرة تدوير المنسوجات!', 
    'body_content': """
        <p style="text-align: right;">
        نحن في RE:SOURCE SYSTEMS نؤمن بمسؤوليتنا المشتركة تجاه البيئة. ندعوكم للانضمام إلى حملتنا
        لتجميع وإعادة تدوير الأقمشة والملابس غير المستخدمة. كل قطعة تساهمون بها هي خطوة نحو تقليل الهدر وتحقيق الاستدامة.
        </p>
        <p style="text-align: right;">
        نحن نستخدم أحدث التقنيات لفرز الألياف، وهذا هو مستقبل الاستدامة.
        </p>
    """, 
    'cta_text': 'تعرف على أقرب نقطة تجميع', 
    'cta_link': 'https://www.resource-systems.com/location', 
    'current_year': datetime.now().year
}

# ------------------------------------------------------------------
# --- 3. معالجة القالب (Jinja2) - لا تعدل هذا القسم ---
# ------------------------------------------------------------------
def render_template(template_name, data):
    template_dir = os.path.dirname(os.path.abspath(__file__))
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template(template_name)
    return template.render(data)

# ------------------------------------------------------------------
# --- 4. ضمان التوافق (Premailer) - لا تعدل هذا القسم ---
# ------------------------------------------------------------------
def inline_css(html_content):
    premailer = Premailer(
        html_content,
        base_url='https://www.resource-systems.com/',
        remove_classes=True,
        keep_style_tags=False
    )
    return premailer.make_html()

# ------------------------------------------------------------------
# --- 5. دالة الإرسال - لا تعدل هذا القسم ---
# ------------------------------------------------------------------
def send_automated_email(receiver_email, subject, html_body):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = SENDER_EMAIL
    msg['To'] = receiver_email
    
    part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(part)

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.ehlo()
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        
        server.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())
        server.close()
        print(f"✅ تم إرسال الإيميل بنجاح إلى: {receiver_email}")
    except Exception as e:
        print(f"❌ حدث خطأ أثناء الإرسال: {e}")

# ------------------------------------------------------------------
# --- 6. تشغيل النظام - لا تعدل هذا القسم ---
# ------------------------------------------------------------------
if __name__ == "__main__":
    raw_html = render_template('email_template.html', template_data)
    final_html_body = inline_css(raw_html)
    
    email_subject = template_data['title']
    send_automated_email(RECEIVER_EMAIL, email_subject, final_html_body)