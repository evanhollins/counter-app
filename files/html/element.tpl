<div class="counter-element">
    <div class="counter-label counter-top-label">
        {{#above}}
            {top:text default="ABOVE"}
        {{/above}}
    </div>
    <div class="counter-number">
        <div {{#num_bold}}class="content-number-bold"{{/num_bold}}>{{start}}</div>
    </div>
    <div class="counter-label counter-bottom-label">
        {{#below}}
            {bottom:text default="BELOW"}
        {{/below}}
    </div>
</div>