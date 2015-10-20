
;;;; Scoring functions for 2030-watch.de in Emacs Lisp

;; 7.3. Share of energy from renewables.json
(defun score-value-fn (value)
  (cond ((> value 40.5) 1)
        ((and (<= value 40.5) (> value 30.5)) 2)
        ((and (<= value 30.5) (> value 20.5)) 3)
        ((and (<= value 20.5) (> value 10.5)) 4)
        ((<= value 10.5) 5)))

;; Open Government Partnership membership.json
(defun score-value-fn (value)
  (cond ((= value 1) 1)
        ((= value 2) 2)
        ((= value 3) 3)
        ((= value 5) 5)
        (t 6)))

;; Staatsschulden
(defun score-value-fn (value)
  (cond ((< value 30) 1)
        ((< value 60) 2)
        ((< value 90) 3)
        ((< value 120) 4)
        ((>= value 120) 5)))

;; Land- EPI_Pesticide Regulation_Stockholm Convention_2012
(defun score-value-fn (value)
  (cond ((>= value 20) 1)
        ((>= value 15) 2)
        ((>= value 10) 3)
        ((>= value 5) 4)
        ((>= value 0) 5)
        (t 6)))

;; In Work Poverty Rate
(defun score-value-fn (value)
  (cond ((< value 3) 1)
        ((< value 6) 2)
        ((< value 9) 3)
        ((< value 12) 4)
        ((>= value 12) 5)))

;; Underwater EPI fish stocks
(defun score-value-fn (value)
  (cond ((< value 0) 6)
        ((= value 0) 1)
        ((< value 0.1) 2)
        ((< value 0.2) 4)
        ((>= value 0.2) 5)))

;; Underwater WB fish species threatened
(defun score-value-fn (value)
  (cond ((< value 10) 1)
        ((< value 20) 2)
        ((< value 40) 3)
        ((< value 80) 4)
        (t 5)))

;; 56. Youth unemployment rate
(defun score-value-fn (value)
  (cond ((< value 10) 1)
        ((< value 20) 2)
        ((< value 30) 3)
        ((< value 40) 4)
        (t 5)))

;; DEVOLOPMENT COOPERATION_QUODA_Fostering Institutions.json
(defun score-value-fn (value)
  (cond ((< value -1) 5)
        ((< value -0.3) 4)
        ((< value 0.3) 3)
        ((< value 0.9) 2)
        ((< value 99999) 1)
        (t 6)))

;; DEVOLOPMENT COOPERATION_QUODA_Maximising efficiency.json
(defun score-value-fn (value)
  (cond ((< value -0.3) 5)
        ((< value -0.15) 4)
        ((< value 0.15) 3)
        ((< value 0.3) 2)
        ((< value 99999) 1)
        (t 6)))

;; DEVOLOPMENT COOPERATION_QUODA_Reducing Burden.json
(defun score-value-fn (value)
  (cond ((< value -0.5) 5)
        ((< value -0.15) 4)
        ((< value 0.15) 3)
        ((< value 0.5) 2)
        ((< value 9999) 1)
        (t 6)))

;; DEVOLOPMENT COOPERATION_QUODA_Transparency and Learning.json
(defun score-value-fn (value)
  (cond ((< value -0.7) 5)
        ((< value -0.15) 4)
        ((< value 0.15) 3)
        ((< value 0.4) 2)
        ((< value 99999) 1)
        (t 6)))

;; 93. Existence and implementation of a national law and or constitutional guarantee on the right to information - WJP-Open-Gov-2015.json
(defun score-value-fn (value)
  6)

;; 5.1 The unadjusted gender pay gap by economic activity in percent 2013.json
(defun score-value-fn (value)
  6)

;; 10.1. Gini Coefficient - si.pov.gini_Indicator_en_excel_v222.json
(defun score-value-fn (value)
  6)

;; Equality- WB_Old Age Dependency Rates_2014.json
(defun score-value-fn (value)
  (cond ((< value 5) 1)
        ((< value 10) 2)
        ((< value 15) 3)
        ((< value 20) 4)
        ((>= value 20) 5)))

;; Unterwater- WB_Marine Protected Areas_2012.json
(cond ((< value 10) 5)
      ((< value 20) 4)
      ((< value 30) 3)
      ((< value 40) 2)
      ((>= value 50) 1))

;; Early School Leavers.json
(defun score-value-fn (value)
  (cond ((< value 4) 1)
        ((< value 8) 2)
        ((< value 12) 3)
        ((< value 16) 4)
        ((>= value 16) 5)))

;; higher-order funtion for scoring
(defun score-value ()
  "Iterates through a preformatted 2030-watch json file
and computes scores from values using score-value-fn."
  (interactive)
  (let* ((value-start (re-search-forward "value\":[[:space:]]*"))
         (value-end (re-search-forward "[[:digit:]]+\\.?[[:digit:]]*"))
         (value (string-to-number (buffer-substring value-start value-end)))
         (score-start (re-search-forward "score\":[[:space:]]*"))
         (score-end (re-search-forward "$")))
    (delete-region score-start score-end)
    (insert (number-to-string (score-value-fn value)))))
