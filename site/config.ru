use Rack::Static,
    :urls => ["/img", "/js", "/css"],
    :root => "public"

run Rack::File.new("public")