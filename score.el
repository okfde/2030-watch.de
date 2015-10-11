
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

;; EarlySchoolLeavers.json
(defun score-value-fn (value)
  (cond ((< value 4) 1)
        ((< value 8) 2)
        ((< value 12) 3)
        ((< value 16) 4)
        (t 5)))

;; Consumption -OECD Municipal waste per capita 2013
(defun score-value-fn (value)
  (cond ((< value 0) 6)
        ((< value 300) 1)
        ((< value 400) 2)
        ((< value 500) 3)
        ((< value 600) 4)
        ((>= value 600) 5)))

;; Economy - EPI Agricultural Subsidies 2011
(defun score-value-fn (value)
  (cond ((< value 0) 1)
        ((< value 0.1) 2)
        ((< value 0.2) 3)
        ((< value 0.3) 4)
        ((and (>= value 0.3)
              (<= value 1)) 5)
        (t 6)))

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
