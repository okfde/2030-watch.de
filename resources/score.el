
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
