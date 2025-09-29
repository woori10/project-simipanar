@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img class="logo" alt="Kemenkeu Logo">
    @else
    <img src="{{ asset('images/bea-cukai.png') }}" alt="Logo Kemenkeu" style="height:40px;">
    @endif
</a>
</td>
</tr>
