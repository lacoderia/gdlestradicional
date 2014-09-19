#!/usr/bin/env ruby
ENV["RAILS_ENV"] = "production"

require File.dirname(__FILE__) + "/../config/environment"

DisplayController.illuminate_map ARGV[0]
