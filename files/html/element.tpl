<div class="counter-element">
	<div class="counter-label counter-top-label">
		{{#top_label}}
			{top:text default="TOP LABEL"}
		{{/top_label}}
	</div>
	<div class="counter-number">
		<p {{#num_bold}}class="content-number-bold"{{/num_bold}}>{{start}}</p>
	</div>
	<div class="counter-label counter-bottom-label">
		{{#bottom_label}}
			{bottom:text default="BOTTOM LABEL"}
		{{/bottom_label}}
	</div>
</div>