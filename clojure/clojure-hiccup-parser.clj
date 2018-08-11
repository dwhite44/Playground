;; Creating a hiccup parser using clojure.spec with very little code
;; Youtube Video: https://www.youtube.com/watch?v=xLB8Xgt8lpA

(s/def :hiccup/form
  (s/or
    :string string?
    :number number?
    :element :hiccup/element))

(s/def :hiccup/element
  (s/cat
    :tag keyword?
    :attrs (s/? map?)
    :children (s/* :hiccup/form)))

(s/valid? :hiccup/form [:h1 "Hello!"])

(s/conform :hiccup/conform
           [:h1 "Hello!"])

(defn parse-hiccup [hiccup]
  (s/conform :hiccup/form hiccup))

(defmulti html first)

(defmethod html :string [[_ v]]
  v)

(defmethod html :number [[_ v]]
  v)

(defmethod html :element [[_ {:keys [tag attrs children]}]]
  (str "<" (name tag) ">"
    (->> (map html children)
         (clojure.string/join " "))
    "</" (name tag) ">"))

;; Example usages
(html (parse-hiccup [:div {} [:h1 "Test!"]]))
