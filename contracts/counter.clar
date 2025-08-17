;; counter.clar
;; A simple on-chain counter contract

;; Define a variable to store the count (initially 0)
(define-data-var count int 0)

;; Function to increment the counter
(define-public (increment)
  (begin
    (var-set count (+ (var-get count) 1))
    (ok (var-get count))
  )
)

;; Function to decrement the counter
(define-public (decrement)
  (begin
    (var-set count (- (var-get count) 1))
    (ok (var-get count))
  )
)

;; Function to get the current count
(define-read-only (get-count)
  (ok (var-get count))
)
