import sublime
import sublime_plugin
import re
import pprint
import json

class OwlcommentCommand(sublime_plugin.TextCommand):

	global COMS
	COMS = [{
		"find" 	: ".demo-item",
		"desc": "demo item"
	}
	,{
		"find" 	: ".demo-info",
		"desc": "demo information"
	}
	,{
		"find" 	: ".demo-thumb",
		"desc": "demo thumbnail"
	}
	,{
		"find" 	: ".ol-accordion",
		"desc": "accordion"
	}
	,{
		"find" 	: ".ac-item",
		"desc": "accordion item"
	}
	,{
		"find" 	: ".ol-agenda",
		"desc": "schedule item"
	}
	,{
		"find" 	: ".ag-section",
		"desc": "agenda section"
	}
	,{
		"find" 	: ".call-out",
		"desc": "call to action"
	}
	,{
		"find" 	: ".ol-grid-filters",
		"desc": "grid filters"
	}
	,{
		"find" 	: ".grid-item",
		"desc": "grid item"
	}
	,{
		"find" 	: ".multi-columns-row",
		"desc": "row with multiple columns"
	}
	,{
		"find" 	: ".journal-el",
		"desc": "journal element"
	}
	,{
		"find" 	: ".book-el",
		"desc": " book element"
	}
	,{
		"find" 	: ".icon-box.ib-v2",
		"desc": "iconbox v1"
	}
	,{
		"find" 	: ".icon-box.ib-v1",
		"desc": "iconbox v1"
	}
	,{
		"find" 	: ".icon-box.ib-v3",
		"desc": "iconbox v3"
	}
	,{
		"find" 	: ".icon-box.ib-v4",
		"desc": "iconbox v4"
	}
	,{
		"find" 	: ".icon-box.ib-v5",
		"desc": "iconbox v5"
	}
	,{
		"find" 	: ".icon-box.ib-v6",
		"desc": "iconbox v6"
	}
	,{
		"find" 	: ".icon-box.ib-v7",
		"desc": "iconbox v7"
	}
	,{
		"find" 	: ".icon-box.ib-v8",
		"desc": "iconbox v8"
	}
	,{
		"find" 	: "ul.icon-list",
		"desc": "list with icon"
	}
	,{
		"find" 	: ".heading-with-sub",
		"desc": "heading"
	}
	,{
		"find" 	: ".fact-item",
		"desc": "number item"
	}
	,{
		"find" 	: ".featured-item",
		"desc": "featured item"
	}
	,{
		"find" 	: ".ol-price-table",
		"desc": "pricing table"
	}
	,{
		"find" 	: ".progress-bar",
		"desc": "progress item"
	}
	,{
		"find" 	: ".extend-bg-wrapper",
		"desc": "extended background"
	}
	,{
		"find" 	: ".ol-side-navigation",
		"desc": "sidebar navigation"
	}
	,{
		"find" 	: "ul.sub-menu",
		"desc": "sub-menu"
	}
	,{
		"find" 	: ".social-icons",
		"desc": "social icons"
	}
	,{
		"find" 	: ".ol-tab",
		"desc": "tab element"
	}
	,{
		"find" 	: "ul.tab-navigation",
		"desc": "tab navigation"
	}
	,{
		"find" 	: ".tab-pane",
		"desc": "tab panel item"
	}
	,{
		"find" 	: ".testimonial-item",
		"desc": "single testimonial"
	}
	,{
		"find" 	: ".ol-timeline-tab",
		"desc": "timeline tab"
	}
	,{
		"find" 	: ".tl-item",
		"desc": "timeline item"
	}
	,{
		"find" 	: ".ol-timeline",
		"desc": "timeline"
	}
	,{
		"find" 	: ".event-table",
		"desc": "events table"
	}
	,{
		"find" 	: ".vc-card",
		"desc": "person card"
	}
	,{
		"find" 	: ".widget",
		"desc": "widget"
	}
	,{
		"find" 	: ".summary-box",
		"desc": "summary box"
	}
	,{
		"find" 	: ".owl-carousel",
		"desc": "carousel"
	}
	,{
		"find" 	: ".vac-list",
		"desc": "vacancy list"
	}
	,{
		"find" 	: ".course-el",
		"desc": "course element"
	}
	,{
		"find" 	: ".course-intro",
		"desc": "course introduction"
	}
	,{
		"find" 	: "a.lesson-item",
		"desc": "lesson"
	}
	,{
		"find" 	: ".author-bio",
		"desc": "author biography"
	}
	,{
		"find" 	: "ul.comments",
		"desc": "comments"
	}
	,{
		"find" 	: "li.comment",
		"desc": "single comment"
	}
	,{
		"find" 	: ".featured-news-box",
		"desc": "features news carousel"
	}
	,{
		"find" 	: ".news-posts",
		"desc": "posts list"
	}
	,{
		"find" 	: ".post-metas",
		"desc": "post metadata"
	}
	,{
		"find" 	: ".post-body",
		"desc": "post contents"
	}
	,{
		"find" 	: "dl.description-item",
		"desc": "description metas"
	}
	,{
		"find" 	: ".shop-item",
		"desc": "shop item"
	}
	,{
		"find" 	: ".category-list",
		"desc": "list of categoreis"
	}
	,{
		"find" 	: ".posts-list",
		"desc": "list of posts"
	}
	,{
		"find" 	: "nav.ol-pagination",
		"desc": "pagination links"
	}
	,{
		"find" 	: "footer#footer",
		"desc": "footer"
	}
	,{
		"find" 	: ".logo-wrapper",
		"desc": "logo wrapper"
	}
	,{
		"find" 	: ".ol-search-trigger",
		"desc": "trigger for search"
	}
	,{
		"find" 	: ".head-main",
		"desc": "header main area"
	}
	,{
		"find" 	: ".header-icons",
		"desc": "icons beside menu"
	}
	,{
		"find" 	: ".page-head",
		"desc": "page head"
	}
	,{
		"find" 	: " --------- ",
		"desc": ""
	}
	,{
		"find" 	: " --------- ",
		"desc": ""
	}
	,{
		"find" 	: " --------- ",
		"desc": ""
	}
	,{
		"find" 	: " --------- ",
		"desc": ""
	}
	
	]

	def run(self, edit):
		self.edit = edit
		
		json_encoded = json.dumps(COMS)
		decoded_data = json.loads(json_encoded)
		
		#  delete blank line
		self.view.run_command('delete_blank_lines')

		for key in decoded_data:
			start=0
			flg=True
			while flg == True:
				myRegion = sublime.Region(start, self.view.size())
				regionLines=self.view.lines(myRegion)
				found=False
				for sLine in regionLines:
					strings = self.view.substr(sLine)

					if key['find'] in strings:
						found=True
						eLine=self.get_end_of_block(sLine)
						self.print_comments_on(sLine,key['desc'])

						start=self.view.text_point(self.view.rowcol(eLine.begin())[0]+2,0)
						myRegion=sublime.Region(start, self.view.size())
						break

				flg=found



	def print_comments_on(self,sLine,text):
		
		sIndent = self.extract_indent_of_line(sLine)
		# end line of the comment block
		eLine = self.get_end_of_block(sLine)
		#print comments
		self.print_end_comment(eLine, sIndent, " #####End "+text)
		self.print_start_comment(sLine, sIndent, " #####Begin "+text)


	def print_start_comment(self, line, indent,text):
		self.view.insert(self.edit, line.begin(), indent+'//'+text+'\n')
	
	def print_end_comment(self, line, indent,text):
		self.view.insert(self.edit, line.end(), "\n"+indent+'//'+text)
	
	def get_indent_of_line(self,line):
		s = self.view.substr(line)
		return len(self.extract_indent(s))

	def extract_indent_of_line(self,line):
		s = self.view.substr(line)
		return self.extract_indent(s)

	def extract_indent(self,s):
		indent_matcher = re.compile("^[ \t]*")
		return indent_matcher.match(s).group(0)

	def get_end_of_block(self,fromLine):
		beginIndent = self.get_indent_of_line(fromLine)
		myRegion = sublime.Region(fromLine.end(), self.view.size())
		regionLines=self.view.lines(myRegion)
		
		lastLine = None
		counter = 0
		for l in regionLines:
			counter=counter+1
			indent = self.get_indent_of_line(l)
			if counter >= 2 and indent <= beginIndent:
				break
			lastLine = l
		return lastLine
	def get_region_lines(self,start,end):
		myRegion = sublime.Region(start, end)
		return self.view.lines(myRegion)


