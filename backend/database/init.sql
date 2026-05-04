CREATE TABLE IF NOT EXISTS page_settings (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL,
  key_name VARCHAR(100) NOT NULL,
  value_text TEXT NOT NULL,
  UNIQUE (section_name, key_name)
);

CREATE TABLE IF NOT EXISTS navigation_links (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS insurance_types (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS license_plate_regions (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  prefixes VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS why_choose_reasons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  number_text VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS benefits (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS process_steps (
  id SERIAL PRIMARY KEY,
  step_number VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  avatar_key VARCHAR(100) NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS app_features (
  id SERIAL PRIMARY KEY,
  feature_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  category_color VARCHAR(30) NOT NULL,
  published_at VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_key VARCHAR(100) NOT NULL,
  website_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS footer_links (
  id SERIAL PRIMARY KEY,
  section_title VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  href TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_infos (
  id SERIAL PRIMARY KEY,
  contact_type VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  value_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGSERIAL PRIMARY KEY,
  insurance_type_slug VARCHAR(100) NOT NULL,
  insurance_type_name VARCHAR(255) NOT NULL,
  license_plate_region_slug VARCHAR(100) NOT NULL,
  license_plate_region_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  notes TEXT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

TRUNCATE TABLE
  page_settings,
  navigation_links,
  insurance_types,
  license_plate_regions,
  why_choose_reasons,
  stats,
  benefits,
  process_steps,
  faqs,
  testimonials,
  app_features,
  news_articles,
  partners,
  footer_links,
  contact_infos
RESTART IDENTITY;

INSERT INTO page_settings (section_name, key_name, value_text) VALUES
  ('hero', 'banner_alt', 'DBV Insurance Banner'),
  ('quote', 'eyebrow', 'T�NH PH� & MUA B�O HI�M NHANH CH�NG'),
  ('quote', 'heading', 'CH� 1 PH�T - NH�N NGAY B�O GI�'),
  ('quote', 'button_text', 'NH�N B�O GI�'),
  ('why_choose', 'eyebrow', 'V� SAO CH�N DBV?'),
  ('why_choose', 'heading', 'CAM K�T �NG H�NH C�NG B�N'),
  ('products', 'eyebrow', 'S�N PH�M N�I B�T'),
  ('products', 'heading', 'A D�NG GI�I PH�P B�O HI�M'),
  ('products', 'subheading', 'L�a ch�n g�i b�o hi�m ph� h�p, t�n h��ng h�nh tr�nh tr�n v�n.'),
  ('products', 'button_text', 'XEM T�T C� S�N PH�M'),
  ('benefits', 'eyebrow', 'QUY�N L�I KHI THAM GIA B�O HI�M DBV'),
  ('benefits', 'heading', 'B�O V� TO�N DI�N - AN T�M TR�N V�N'),
  ('process', 'eyebrow', 'QUY TR�NH THAM GIA B�O HI�M'),
  ('process', 'heading', '4 B��C �N GI�N'),
  ('faq', 'eyebrow', 'C�U H�I TH��NG G�P'),
  ('faq', 'heading', 'GI�I �P TH�C M�C C�A B�N'),
  ('testimonials', 'eyebrow', 'KH�CH H�NG N�I G� V� DBV'),
  ('testimonials', 'heading', 'TRI�U KH�CH H�NG TIN T��NG'),
  ('mobile_app', 'eyebrow', '�NG D�NG DBV INSURANCE'),
  ('mobile_app', 'heading', 'QU�N L� B�O HI�M D� D�NG TR�N I�N THO�I'),
  ('mobile_app', 'app_store_text', 'Download on the App Store'),
  ('mobile_app', 'google_play_text', 'Get it on Google Play'),
  ('news', 'eyebrow', 'TIN T�C M�I NH�T'),
  ('news', 'heading', 'C�P NH�T TH�NG TIN H�U �CH'),
  ('news', 'button_text', 'XEM T�T C�'),
  ('partners', 'heading', '�I T�C C�A DBV'),
  ('banner', 'button_text', 'G�I T� V�N NGAY'),
  ('banner', 'phone_number', '1900 1234'),
  ('banner', 'support_text', 'H� tr� 24/7 mi�n ph�'),
  ('contact_support', 'zalo_url', 'https://zalo.me/0901234567'),
  ('contact_support', 'zalo_label', 'Chat with Zalo'),
  ('contact_support', 'map_embed_url', 'https://www.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&z=15&output=embed'),
  ('contact_support', 'map_title', 'DBV office map'),
  ('footer', 'brand_name', 'DBV'),
  ('footer', 'brand_subtitle', 'Insurance'),
  ('footer', 'description', 'DBV cam k�t mang �n c�c gi�i ph�p b�o hi�m �u vi�t, b�o v� b�n v� gia �nh tr��c m�i r�i ro.'),
  ('footer', 'copyright', '� 2024 DBV Insurance. All rights reserved.');

INSERT INTO navigation_links (label, href, display_order) VALUES
  ('Trang ch�', '#home', 1),
  ('S�n ph�m', '#products', 2),
  ('Quy�n l�i', '#benefits', 3),
  ('Tin t�c', '#news', 4),
  ('Li�n h�', '#contact', 5);

INSERT INTO insurance_types (slug, name, description, icon_key, display_order) VALUES
  ('oto', 'Xe � T�', 'B�o v� to�n di�n cho xe v� ng��i ng�i tr�n xe', 'oto', 1),
  ('xemay', 'Xe M�y', 'An t�m vi vu tr�n m�i cung ��ng', 'xemay', 2),
  ('suckhoe', 'S�c Kh�e', 'Chm s�c s�c kh�e to�n di�n cho b�n v� gia �nh', 'suckhoe', 3),
  ('dulich', 'Du L�ch', 'An t�m kh�m ph�, tr�n v�n tr�i nghi�m', 'dulich', 4),
  ('hanghoa', 'H�ng H�a', 'B�o v� h�ng h�a trong qu� tr�nh v�n chuy�n', 'hanghoa', 5),
  ('nha', 'Nh� T� Nh�n', 'B�o v� ng�i nh� v� t�i s�n tr��c m�i r�i ro', 'nha', 6);

INSERT INTO license_plate_regions (slug, name, prefixes, display_order) VALUES
  ('hanoi', 'H� N�i', '29, 30, 31, 32, 33, 40', 1),
  ('hcm', 'TP.HCM', '50, 51, 52, 53, 54, 55, 56, 57, 58, 59', 2),
  ('danang', '� N�ng', '43', 3),
  ('haiphong', 'H�i Ph�ng', '15, 16', 4),
  ('cantho', 'C�n Th�', '65', 5),
  ('other', 'T�nh th�nh kh�c', 'Kh�c', 6);

INSERT INTO why_choose_reasons (title, description, icon_key, display_order) VALUES
  ('Th��ng hi�u uy t�n', 'H�n 15 nm kinh nghi�m trong l)nh v�c b�o hi�m', 'why-1', 1),
  ('Quy tr�nh �n gi�n', 'Th� t�c nhanh g�n, d� d�ng, ti�t ki�m th�i gian', 'why-2', 2),
  ('B�i th��ng minh b�ch', 'Cam k�t b�i th��ng r� r�ng, �ng quy �nh', 'why-3', 3),
  ('M�ng l��i r�ng kh�p', 'H�n 200+ gara li�n k�t tr�n to�n qu�c', 'why-4', 4),
  ('C�ng ngh� hi�n �i', 'N�n t�ng tr�c tuy�n th�ng minh, tr�i nghi�m ti�n l�i', 'why-5', 5);

INSERT INTO stats (number_text, label, icon_key, display_order) VALUES
  ('15+', 'Nm kinh nghi�m', 'stat-6', 1),
  ('500,000+', 'Kh�ch h�ng tin t��ng', 'stat-7', 2),
  ('98%', 'T� l� b�i th��ng th�nh c�ng', 'stat-8', 3),
  ('24/7', 'H� tr� kh�ch h�ng', 'stat-9', 4);

INSERT INTO benefits (title, description, icon_key, display_order) VALUES
  ('B�o v� to�n di�n', 'a d�ng quy�n l�i ph� h�p nhu c�u', 'benefit-10', 1),
  ('Chi ph� h�p l�', 'M�c ph� c�nh tranh, nhi�u �u �i h�p d�n', 'benefit-11', 2),
  ('H� tr� 24/7', 'T� v�n v� h� tr� m�i l�c, m�i n�i', 'benefit-12', 3),
  ('B�i th��ng nhanh ch�ng', 'Quy tr�nh �n gi�n, nh�n b�i th��ng nhanh', 'benefit-13', 4),
  ('T� do l�a ch�n', 'Linh ho�t l�a ch�n g�i b�o hi�m ph� h�p', 'benefit-14', 5);

INSERT INTO process_steps (step_number, title, description, display_order) VALUES
  ('1', 'Ch�n s�n ph�m', 'L�a ch�n g�i b�o hi�m ph� h�p nhu c�u', 1),
  ('2', 'Cung c�p th�ng tin', 'i�n �y � th�ng tin theo h��ng d�n', 2),
  ('3', 'Thanh to�n', 'Thanh to�n tr�c tuy�n nhanh ch�ng, an to�n', 3),
  ('4', 'Nh�n h�p �ng', 'Nh�n h�p �ng i�n t� v� gi�y ch�ng nh�n', 4);

INSERT INTO faqs (question, answer, display_order) VALUES
  ('B�o hi�m xe � t� c� b�t bu�c kh�ng?', 'Theo quy �nh c�a ph�p lu�t Vi�t Nam, b�o hi�m tr�ch nhi�m d�n s� c�a ch� xe c� gi�i l� b�t bu�c. �y l� lo�i b�o hi�m c� b�n nh�t m� m�i ch� xe � t� ph�i mua � ��c l�u h�nh tr�n ��ng.', 1),
  ('Th�i gian b�i th��ng m�t bao l�u?', 'Th�i gian b�i th��ng ph� thu�c v�o t�ng tr��ng h�p c� th�. �i v�i c�c tr��ng h�p �n gi�n, th�i gian b�i th��ng th��ng t� 7-15 ng�y l�m vi�c. �i v�i c�c tr��ng h�p ph�c t�p c�n i�u tra th�m, th�i gian c� th� k�o d�i h�n nh�ng kh�ng qu� 30 ng�y.', 2),
  ('T�i c� th� mua b�o hi�m online ��c kh�ng?', 'C�, b�n ho�n to�n c� th� mua b�o hi�m online th�ng qua website ch�nh th�c c�a DBV. Quy tr�nh �n gi�n, nhanh ch�ng v� an to�n. B�n s� nh�n ��c h�p �ng i�n t� ngay sau khi thanh to�n th�nh c�ng.', 3),
  ('L�m th� n�o � y�u c�u b�i th��ng?', 'Khi x�y ra s� c�, b�n c�n: 1) B�o ngay cho c�ng ty b�o hi�m qua hotline 24/7, 2) B�o v� hi�n tr��ng v� thu th�p b�ng ch�ng, 3) Chu�n b� �y � h� s� theo y�u c�u, 4) N�p h� s� t�i vn ph�ng g�n nh�t ho�c online. �i ngi chuy�n vi�n s� h� tr� b�n trong su�t qu� tr�nh.', 4),
  ('Chi ph� b�o hi�m ��c t�nh nh� th� n�o?', 'Chi ph� b�o hi�m ��c t�nh d�a tr�n nhi�u y�u t� nh�: lo�i xe, gi� tr� xe, m�c �ch s� d�ng, khu v�c ho�t �ng, l�ch s� b�i th��ng, v� c�c quy�n l�i b� sung b�n l�a ch�n. DBV cung c�p nhi�u g�i b�o hi�m linh ho�t ph� h�p v�i t�ng nhu c�u v� ng�n s�ch.', 5);

INSERT INTO testimonials (name, location, review, avatar_key, rating, display_order) VALUES
  ('Nguy�n Ho�ng Nam', 'Kh�ch h�ng t�i H� N�i', 'D�ch v� r�t nhanh ch�ng v� chuy�n nghi�p. T�i � ��c b�i th��ng ch� sau 2 ng�y, r�t h�i l�ng!', 'avt1', 5, 1),
  ('Tr�n Thu Trang', 'Kh�ch h�ng t�i � N�ng', 'Mua b�o hi�m online r�t ti�n l�i, th� t�c �n gi�n. Nh�n vi�n t� v�n nhi�t t�nh, h� tr� 24/7.', 'avt2', 5, 2),
  ('L� Minh �c', 'Kh�ch h�ng t�i TP.HCM', 'Quy�n l�i t�t, chi ph� h�p l�. DBV l� l�a ch�n s� 1 c�a t�i v� gia �nh.', 'avt1', 5, 3),
  ('Ph�m Th� Lan', 'Kh�ch h�ng t�i H�i Ph�ng', 'T�i � s� d�ng d�ch v� b�o hi�m c�a DBV ��c 3 nm. R�t tin t��ng v� h�i l�ng v�i ch�t l��ng ph�c v�.', 'avt2', 5, 4);

INSERT INTO app_features (feature_text, display_order) VALUES
  ('Mua b�o hi�m nhanh ch�ng', 1),
  ('Theo d�i h�p �ng, l�ch s� b�i th��ng', 2),
  ('Nh�n th�ng b�o v� �u �i h�p d�n', 3),
  ('H� tr� 24/7 m�i l�c m�i n�i', 4);

INSERT INTO news_articles (category, category_color, published_at, title, description, image_url, link_url, display_order) VALUES
  ('Kinh nghi�m', '#1a6b2f', '20/04/2024', '5 kinh nghi�m l�i xe an to�n m�a m�a b�o', 'Nh�ng l�u � quan tr�ng gi�p b�n l�i xe an to�n trong i�u ki�n th�i ti�t x�u.', 'https://bhdbv.com/wp-content/uploads/2020/10/bhdbv-baohiemxe-autocare-1024x512.jpg', '#', 1),
  ('Tin t�c', '#1a6b2f', '18/04/2024', 'DBV ra m�t g�i b�o hi�m xe � t� to�n di�n m�i', 'Quy�n l�i v��t tr�i, ph� c�nh tranh, b�o v� t�i �u cho xe y�u c�a b�n.', 'https://bhdbv.com/wp-content/uploads/2026/03/dbv-allianz-partners-thailand-buoc-ngoat-bao-hiem-xe-co-gioi-viet-nam-1024x512.jpg', '#', 2),
  ('H��ng d�n', '#1a6b2f', '15/04/2024', 'H��ng d�n y�u c�u b�i th��ng tr�c tuy�n', 'C�c b��c �n gi�n � y�u c�u b�i th��ng nhanh ch�ng v� thu�n ti�n.', 'https://bhdbv.com/wp-content/uploads/2026/02/trien-khai-cap-giay-chung-nhan-dang-kiem-dien-tu-01-3-2026-1024x512.jpg', '#', 3);

INSERT INTO partners (name, logo_key, website_url, display_order) VALUES
  ('Toyota', 'toyota', '#', 1),
  ('Honda', 'honda', '#', 2),
  ('Ford', 'ford', '#', 3),
  ('VinFast', 'vin', '#', 4),
  ('Thaco', 'thaco', '#', 5);

INSERT INTO footer_links (section_title, label, href, display_order) VALUES
  ('S�N PH�M', 'B�o hi�m xe � t�', '#', 1),
  ('S�N PH�M', 'B�o hi�m xe m�y', '#', 2),
  ('S�N PH�M', 'B�o hi�m s�c kh�e', '#', 3),
  ('S�N PH�M', 'B�o hi�m du l�ch', '#', 4),
  ('S�N PH�M', 'B�o hi�m h�ng h�a', '#', 5),
  ('H� TR�', 'H��ng d�n mua b�o hi�m', '#', 1),
  ('H� TR�', 'H��ng d�n b�i th��ng', '#', 2),
  ('H� TR�', 'C�u h�i th��ng g�p', '#', 3),
  ('H� TR�', 'i�u kho�n b�o hi�m', '#', 4),
  ('H� TR�', 'Li�n h� h� tr�', '#', 5),
  ('V� DBV', 'Gi�i thi�u', '#', 1),
  ('V� DBV', 'Tin t�c', '#', 2),
  ('V� DBV', 'Tuy�n d�ng', '#', 3),
  ('V� DBV', 'Ch�nh s�ch b�o m�t', '#', 4),
  ('V� DBV', 'i�u kho�n s� d�ng', '#', 5);

INSERT INTO contact_infos (contact_type, label, value_text, display_order) VALUES
  ('phone', 'Hotline', '1900 1234', 1),
  ('email', 'Email', 'hotro@dbv.com.vn', 2),
  ('address', '�a ch�', 'T�ng 12, T�a nh� DBV, Qu�n 1, TP. H� Ch� Minh', 3);
