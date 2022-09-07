# NameList Structure

```
[root] (array)
╘═ [category] (object)
   ├─ category (string|optional)
   ├─ filterText (string|optional)
   └─ subcategories (array)
      ╘═ [subcategory] (object)
	     ├─ name (string)
		 └─ componentList (object)
		    ├─ index (number)
			└─ components (array)
			   ╘═ [component] (object)
			      ├─ filter (string|optional)
				  ├─ length (number|string)
				  ├─ allowedWords (string|optional)
				  ├─ reduceStems (boolean|optional)
				  └─ list (array)
				     ╘═ [stem] (string)
```

## Category Object

### category

This is a string for the catgory name (*e.g.* "Altmer", "Dunmer", etc).  It should be unique.

If this string is not provided, this category object will be ignored, and it can be used to hold information about the file.

### filterText

If this is provided in the **first category object**, it will be used to label the Filters panel on the webpage.

## Subcategory Object

### name

This is the subcategory name (*e.g* "Male", "Female", etc).  It should be unique.  To use items from a subcategory regardless of what the user has selected, use `""` here.

## ComponentList Object

### index

This determines the order that items generated from the componentList will be added to a name.  This starts at `1`, and then subsequent numbers may be used.

## Components Object

### filter

This is the filter the components will be used under.  The strings from all the **filter** entries will be collected and displayed in the Filters panel on the webpage.  If this entry is not provided, the components will be used in all cases, regardless of the user's selected filters.

### length

This indicates how the stems will be assembled.  A value of `1` means the stems will be used as-is, while higher values indicate they need to be combined.  A range (*e.g.* `"2-3"`) may also be specified to allow results to vary in length randomly.

### allowedWords

By default, results are rejected if they pass a simple spell check.  If the components are intended to create human-like names, the value `"names"` can be used here to allow results like "Bill" or "Ann".  If the result can include real words, then `"all"` can be used here to allow names like "Bash" or "Lug".

### reduceStems

By default, results are added together without any other modification.  If this leads to redundancy, this entry may be set to `true` to strip out repeated characters.  This applies to any number of shared characters: "Thresh" and "shold" combine into "Threshold" rather than "Threshshold".

### Stem List

To control how items in the stem list are combined, `+` is used at the ends to indicate where a stem can be used:
* For items that are used to start the resulting name, use a `+` at the end, and *only* at the end: `"Abc+"`
* For items that are used in the middle of the name, use `+` at *both ends*: `"+def+"`
* For items that will end the resulting name, use `+` only at the start: `"+ghi"`

## Putting it All Together

Once name parts are generated for each **componentList** **index**, they will be combined together with a space between.  However, there are ways to avoid this:
* A name part that ends with a `-` will be joined directly to the part that follows it.
* A name part that starts with `>` will be joined directly to the part *before* it.
