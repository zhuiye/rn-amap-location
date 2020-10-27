require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "rn-amap-location"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  rn-amap-location
                   DESC
  s.homepage     = "https://github.com/https://github.com/zhuiye/rn-amap-location"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "hengcheng" => "503181017@qq.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/https://github.com/zhuiye/rn-amap-location.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

