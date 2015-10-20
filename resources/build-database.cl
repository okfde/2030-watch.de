
;; Common Lisp code for building database.js

(in-package "CL-USER")

(defvar *collection* #P"/home/cpape/okf/2030-watch.de/resources/single-data-sets/online/")

(defvar *database* #P"/home/cpape/okf/2030-watch.de/resources/database.js")

(defvar *template-start* "var indicators = [")

(defvar *template-end* "];")

(defun build-database ()
  (let ((jsons (uiop/filesystem:directory-files *collection*)))
    (with-open-file (out *database* :direction :output :external-format :utf-8 :if-exists :supersede)
      (format out "~&~A" *template-start*)
      (loop
         for json in jsons
         for rest on jsons
         do (with-open-file (in json :direction :input :external-format :utf-8)
              (format out "~3&")
              (uiop/stream:copy-stream-to-stream in out))
         if (rest rest) do (format out ","))
      (format out "~3&~A" *template-end*))
    (format t "~& ~A written.~%" *database*)))
