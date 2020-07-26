#!/usr/bin/env python
# coding: utf-8

import covsirphy as cs
import sys

data_loader = cs.DataLoader("input")
jhu_data = data_loader.jhu(verbose=False)
population_data = data_loader.population(verbose=False)
scenario = cs.Scenario(jhu_data, population_data, country="India")
_ = scenario.records()
scenario.trend()
scenario.estimate(cs.SIRF)
scenario.add(end_date="04Jan2021")
_ = scenario.simulate()
_.to_csv("predictions.csv")
print(_)
