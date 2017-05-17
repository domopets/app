
Pod::Spec.new do |s|
  s.name = "ExpoKit"
  s.version = "1.15.2"
  s.summary = 'ExpoKit'
  s.description = 'ExpoKit allows native projects to integrate with the Expo SDK.'
  s.homepage = 'http://docs.expo.io'
  s.license = 'BSD'
  s.author = "650 Industries, Inc."
  s.requires_arc = true
  s.platform = :ios, "9.0"
  s.source = { :git => "http://github.com/exponent/exponent.git" }
  s.source_files = "ios/Exponent/**/*.{h,m}"
  s.preserve_paths = "ios/Exponent/**/*.{h,m}"
  s.exclude_files = "ios/Exponent/EXAppDelegate.*", "ios/Exponent/EXRootViewController.*", "ios/Exponent/Supporting/**"

  s.dependency 'Amplitude-iOS', '~> 3.8'
  s.dependency 'Analytics', '~> 3.5'
  s.dependency 'AppAuth', '~> 0.4'
  s.dependency 'CocoaLumberjack', '~> 3.0'
  s.dependency 'Crashlytics', '~> 3.8'
  s.dependency 'FBAudienceNetwork', '4.18'
  s.dependency 'FBSDKCoreKit', '~> 4.15'
  s.dependency 'FBSDKLoginKit', '~> 4.15'
  s.dependency 'FBSDKShareKit', '~> 4.15'
  s.dependency 'Fabric', '~> 1.6'
  s.dependency 'Google/SignIn', '~> 3.0'
  s.dependency 'GoogleMaps', '~> 2.2.0'
  s.dependency 'lottie-ios', '~> 1.5.1'
end
