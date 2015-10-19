
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
